"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl, { Map, Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { haversineDistance } from "@/utils/utils";
import { useRouter, useSearchParams } from "next/navigation";
import CustomButton from "../ui/Button";
import { TbFocusCentered } from "react-icons/tb";
import pin from "@/assets/pin.svg";

interface Coordinates {
  lat: number;
  lng: number;
}

interface PinLocation extends Coordinates {
  id: number;
  title: string;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
mapboxgl.accessToken = MAPBOX_TOKEN;

const PIN_LOCATIONS: PinLocation[] = [
  { id: 1, title: "POI1", lng: 1.9051043, lat: 41.2546824 },
  { id: 2, title: "POI2", lng: 1.8215565, lat: 41.2351338 },
  { id: 3, title: "POI3", lng: 1.8129802, lat: 41.2355034 },
  { id: 4, title: "POI4", lng: 1.7947774, lat: 41.2298172 },
  { id: 5, title: "POI5", lng: 1.7430935, lat: 41.218227 },
  { id: 6, title: "POI6", lng: 1.725226, lat: 41.2143534 },
  { id: 7, title: "POI7", lng: 1.7135795, lat: 41.2107159 },
  { id: 8, title: "POI8", lng: 1.6734255, lat: 41.1985038 },
  { id: 9, title: "POI9", lng: 1.6700365, lat: 41.1994589 },
  { id: 10, title: "POI10", lng: 1.6361633, lat: 41.1939082 },
  { id: 11, title: "POI11", lng: 1.5813114, lat: 41.1879458 },
  { id: 12, title: "POI12", lng: 1.5493982, lat: 41.1842667 },
  { id: 13, title: "POI13", lng: 1.502091, lat: 41.174888 },
];

export default function ProgressCoinMap() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const userMarker = useRef<Marker | null>(null);
  const pinMarkers = useRef<Marker[]>([]);

  const selectedPoiId = Number(searchParams.get("poiId") || 0);
  const selectedPin = PIN_LOCATIONS.find((p) => p.id === selectedPoiId);

  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  /* 🔹 1. INITIALIZE MAP */
  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [1.7, 41.2],
      zoom: 10,
      attributionControl: false,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-left");

    map.current.on("load", () => {
      if (!map.current) return;

      map.current.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates: [] },
        },
      });

      map.current.addLayer({
        id: "route-layer",
        type: "line",
        source: "route",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": "#0d52ff",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    });

    return () => map.current?.remove();
  }, []);

  /* 🔹 2. FETCH ROAD-FOLLOWING ROUTE FROM MAPBOX */
  useEffect(() => {
    if (!map.current || !userLocation || !selectedPin) {
      // Clear line if no user or no selection
      const source = map.current?.getSource("route") as mapboxgl.GeoJSONSource;
      source?.setData({ type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: [] } });
      return;
    }

    const getRoute = async () => {
      try {
        // We fetch "driving" directions. You can change this to "walking" or "cycling" if preferred.
        const query = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/walking/${userLocation.lng},${userLocation.lat};${selectedPin.lng},${selectedPin.lat}?steps=true&geometries=geojson&&overview=full&access_token=${MAPBOX_TOKEN}`
        );
        const json = await query.json();
        const data = json.routes[0];
        const route = data.geometry.coordinates;

        const source = map.current?.getSource("route") as mapboxgl.GeoJSONSource;
        if (source) {
          source.setData({
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: route,
            },
          });
        }
        
        // Update distance based on actual road distance (converted from meters to km)
        setDistance(data.distance / 1000);

      } catch (error) {
        console.error("Error fetching directions:", error);
      }
    };

    if (map.current.isStyleLoaded()) {
      getRoute();
    } else {
      map.current.once("idle", getRoute);
    }
  }, [userLocation, selectedPin]);

  /* 🔹 3. WATCH USER LOCATION */
  useEffect(() => {
    if (!map.current) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const loc = { 
          lat: pos.coords.latitude, 
          lng: pos.coords.longitude 
        };
        setUserLocation(loc);

        if (!userMarker.current) {
          const el = document.createElement("div");
          el.style.cssText = `
          width: 18px; 
          height: 18px; 
          border: 3px solid white; 
          border-radius: 50%; 
          background: #0d52ff; 
          box-shadow: 0 0 10px rgba(0,0,0,0.3);`;
          userMarker.current = new mapboxgl.Marker(el)
          .setLngLat([loc.lng, loc.lat])
          .addTo(map.current!);
        } else {
          userMarker.current.setLngLat([loc.lng, loc.lat]);
        }
      },
      console.error,
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  /* 🔹 4. RENDER POI PINS */
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers 
    pinMarkers.current.forEach((m) => m.remove());
    pinMarkers.current = [];

    // Only show the selected pin if a POI is selected, otherwise show all pins
    const pinsToShow = selectedPoiId 
      ? PIN_LOCATIONS.filter(pin => pin.id === selectedPoiId)
      : PIN_LOCATIONS;

    pinsToShow.forEach((pinLoc) => {
      const el = document.createElement("div");
      el.style.cssText = `
      width: 32px; 
      height: 32px; 
      background-image: url(${pin.src}); 
      background-size: contain; 
      background-repeat: no-repeat; 
      cursor: pointer;
      `;

      el.onclick = (e) => {
        e.stopPropagation();
        // router.push(`?poiId=${pinLoc.id}`);
        // router.push(`/progress-mapa?lat=${pinLoc.lat}&lng=${pinLoc.lng}&poiId=${pinLoc.id}`);
      };

      const marker = new mapboxgl.Marker({ 
        element: el, 
        anchor: "bottom", 
      })
        .setLngLat([pinLoc.lng, pinLoc.lat])
        .addTo(map.current!);

      pinMarkers.current.push(marker);
    });
  }, [router, selectedPoiId]);

  /* 🔹 5. CENTER MAP ON SELECTION */
  useEffect(() => {
    if (map.current && selectedPin) {
      map.current.flyTo({ center: [selectedPin.lng, selectedPin.lat], zoom: 14 });
    }
  }, [selectedPoiId]);

  return (
    <div className="relative w-full min-h-[80vh]">
      <div ref={mapContainer} className="w-full h-[80vh]" />

      {selectedPin && distance !== null && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white text-backblack px-4 py-2 rounded shadow z-50 text-sm font-semibold flex flex-col items-center">
          {/* <span>{selectedPin.title}</span> */}
          <span className="text-blue-600">{distance.toFixed(2)} km </span>
        </div>
      )}

      <CustomButton
        onClick={() =>
          userLocation &&
          map.current?.flyTo({ 
            center: [userLocation.lng, userLocation.lat], 
            zoom: 16 
          })
        }
        className="absolute bottom-10 right-4 text-white px-[13px] py-3 rounded-lg shadow-lg z-50 !w-[51px]"
      >
        <TbFocusCentered size={24} />
      </CustomButton>
    </div>
  );
}