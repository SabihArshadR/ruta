"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl, { Map, Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { haversineDistance } from "@/utils/utils";
import { useRouter } from "next/navigation";
import CustomButton from "../ui/Button";
import { TbFocusCentered } from "react-icons/tb";
import { useTranslations } from "next-intl";
import pin from "@/assets/pin.svg";
import { useUser } from "@/context/UserContext";
import { createRoot } from "react-dom/client";

interface Coordinates {
  lat: number;
  lng: number;
}

interface PinLocation extends Coordinates {
  id: number;
  title: string;
}

const stopTitle = [
  "first_title",
  "second_title",
  "third_title",
  "fourth_title",
  "fifth_title",
  "sixth_title",
  "seventh_title",
  "eighth_title",
  "ninth_title",
  "tenth_title",
  "eleventh_title",
  "twelfth_title",
  "thirteenth_title",
];

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

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

export default function CoinMap() {
  const router = useRouter();
  const { user, refreshUser } = useUser();

  const COMPLETED_POI_IDS = Array.isArray(user?.completedPOIs)
    ? user.completedPOIs
    : [];

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const t = useTranslations("CoinMap");
  const t2 = useTranslations("Map");

  const userMarker = useRef<Marker | null>(null);
  const pinMarkers = useRef<Marker[]>([]);
  const bubblePopup = useRef<mapboxgl.Popup | null>(null);

  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [selectedDestination, setSelectedDestination] =
    useState<PinLocation | null>(null);
  const [showEnterAR, setShowEnterAR] = useState(false);
  const [distance, setDistance] = useState<number | null>(null);
  const [shouldFollowUser, setShouldFollowUser] = useState(false);
  const [isPopupMinimized, setIsPopupMinimized] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [0, 0],
      zoom: 2,
      attributionControl: false,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-left");

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const loc = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        setUserLocation((prevLoc) => {
          if (prevLoc && prevLoc.lat === loc.lat && prevLoc.lng === loc.lng) {
            return prevLoc;
          }
          return loc;
        });

        if (!userMarker.current) {
          const el = document.createElement("div");
          el.style.cssText = `
          width: 18px;
          height: 18px;
          border: 3px solid white;
          border-radius: 50%;
          background: #0d52ff;
        `;

          userMarker.current = new mapboxgl.Marker(el)
            .setLngLat([loc.lng, loc.lat])
            .addTo(map.current!);
        } else {
          userMarker.current.setLngLat([loc.lng, loc.lat]);
        }

        if (selectedDestination) {
          drawRoute(loc, {
            lat: selectedDestination.lat,
            lng: selectedDestination.lng,
          });
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
      },
      { enableHighAccuracy: true },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [selectedDestination]);

  useEffect(() => {
    if (!map.current) return;

    pinMarkers.current.forEach((m) => m.remove());
    pinMarkers.current = [];

    const bounds = new mapboxgl.LngLatBounds();

    PIN_LOCATIONS.forEach((pinLoc) => {
      const el = document.createElement("div");
      const isCompleted = COMPLETED_POI_IDS.includes(pinLoc.id);

      el.style.cssText = `
        width: 32px;
        height: 32px;
        background-image: url(${pin.src});
        background-size: contain;
        background-repeat: no-repeat;
        cursor: ${isCompleted ? "default" : "pointer"};
        ${isCompleted ? "filter: hue-rotate(100deg);" : ""}
      `;

      el.onclick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handlePinClick(pinLoc, e as unknown as React.MouseEvent);
      };

      const marker = new mapboxgl.Marker({
        element: el,
        anchor: "bottom",
      })
        .setLngLat([pinLoc.lng, pinLoc.lat])
        .addTo(map.current!);

      pinMarkers.current.push(marker);

      bounds.extend([pinLoc.lng, pinLoc.lat]);
    });

    if (PIN_LOCATIONS.length > 0) {
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15,
      });
    }
  }, [router]);

  const drawRoute = useCallback(
    async (start: Coordinates, end: Coordinates) => {
      if (!map.current) return;

      try {
        const query = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/walking/${start.lng},${start.lat};${end.lng},${end.lat}?steps=true&geometries=geojson&overview=full&access_token=${mapboxgl.accessToken}`,
        );

        const data = await query.json();
        // const route = data.routes[0].geometry;

        if (!data.routes || data.routes.length === 0) {
          console.warn("No walking route found");
          return;
        }

        const route = data.routes[0].geometry;

        const geojson: GeoJSON.FeatureCollection<GeoJSON.LineString> = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: route,
              properties: {},
            },
          ],
        };

        if (map.current.getLayer("route")) {
          map.current.removeLayer("route");
        }
        if (map.current.getSource("route")) {
          map.current.removeSource("route");
        }

        map.current.addSource("route", {
          type: "geojson",
          data: geojson,
        });

        map.current.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#1052ff",
            "line-width": 6,
            "line-blur": 2,
            "line-opacity": 0.9,
          },
        });
      } catch (err) {
        console.error("Route error:", err);
      }
    },
    [],
  );

  const playButtonSound = useCallback(() => {
    try {
      const audio = new Audio("/button-sounds/3.mp3");
      audio
        .play()
        .catch((error) => console.error("Error playing sound:", error));
    } catch (error) {
      console.error("Error initializing sound:", error);
    }
  }, []);

  // const handlePinClick = useCallback(
  //   (pinLoc: PinLocation, e: React.MouseEvent) => {
  //     e.preventDefault();
  //     e.stopPropagation();

  //     if (COMPLETED_POI_IDS.includes(pinLoc.id)) {
  //       return;
  //     }

  //     playButtonSound();

  //     if (selectedDestination && selectedDestination.id === pinLoc.id) {
  //       return;
  //     }

  //     setSelectedDestination(pinLoc);

  //     bubblePopup.current?.remove();

  //     // Render the React icon with text to raw HTML so that Mapbox can display it
  //     const bubbleHTML = renderToStaticMarkup(
  //       <div
  //         style={{
  //           position: "relative",
  //           width: isPopupMinimized ? "50px" : "100px",
  //           height: isPopupMinimized ? "30px" : "100px",
  //         }}
  //       >
  //         <div style={{ display: isPopupMinimized ? "none" : "block" }}>
  //           <MdChatBubbleOutline size={isPopupMinimized ? 50 : 200} />
  //         </div>
  //         {!isPopupMinimized && (
  //           <div
  //             style={{
  //               position: "absolute",
  //               top: "80%",
  //               left: "80%",
  //               transform: "translate(-30%, -50%)",
  //               color: "black",
  //               fontSize: "12px",
  //               width: "90%",
  //               textAlign: "center",
  //             }}
  //           >
  //             {t2(stopTitle[pinLoc.id - 1])}
  //           </div>
  //         )}
  //         <button
  //           onClick={(e) => {
  //             e.stopPropagation();
  //             console.log("Minimize button clicked"); // Debugging log
  //             setIsPopupMinimized((prev) => !prev); // Use functional form to avoid stale closure
  //           }}
  //           style={{
  //             position: "absolute",
  //             top: "14px",
  //             left: "160px",
  //             background: "white",
  //             border: "none",
  //             borderRadius: "50%",
  //             width: "20px",
  //             height: "20px",
  //             display: "flex",
  //             alignItems: "center",
  //             justifyContent: "center",
  //             cursor: "pointer",
  //             fontSize: "12px",
  //             fontWeight: "bold",
  //             padding: 0,
  //             zIndex: 10,
  //           }}
  //           title={isPopupMinimized ? "Expand" : "Minimize"}
  //         >
  //           {isPopupMinimized ? "+" : "−"}
  //         </button>
  //       </div>,
  //     );

  //     const popup = new mapboxgl.Popup({
  //       closeButton: false,
  //       closeOnClick: false,
  //       offset: isPopupMinimized ? [15, -30] : [30, -120], // Adjust offset based on minimized state
  //       anchor: "bottom",
  //     })
  //       .setLngLat([pinLoc.lng, pinLoc.lat])
  //       .setHTML(bubbleHTML)
  //       .addTo(map.current!);

  //     bubblePopup.current = popup;

  //     // Center the map on the selected destination when pin is clicked
  //     if (map.current) {
  //       map.current.flyTo({
  //         center: [pinLoc.lng, pinLoc.lat],
  //         zoom: 16,
  //         essential: true,
  //       });
  //     }

  //     if (userLocation) {
  //       drawRoute(userLocation, { lat: pinLoc.lat, lng: pinLoc.lng });
  //     }
  //   },
  //   [
  //     userLocation,
  //     drawRoute,
  //     playButtonSound,
  //     COMPLETED_POI_IDS,
  //     selectedDestination,
  //   ],
  // );

  const handlePinClick = useCallback(
    (pinLoc: PinLocation, e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (COMPLETED_POI_IDS.includes(pinLoc.id)) return;
      playButtonSound();
      if (selectedDestination && selectedDestination.id === pinLoc.id) return;

      // Disable further clicks on this marker
      const targetEl = e.currentTarget as HTMLElement;
      targetEl.onclick = null;
      targetEl.style.cursor = "default";

      setSelectedDestination(pinLoc);

      // 1. Remove old popup
      bubblePopup.current?.remove();

      // 2. Create a "real" DOM container for React to live in
      const popupNode = document.createElement("div");

      // 3. Create the popup and use .setDOMContent instead of .setHTML
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: isPopupMinimized ? [15, -30] : [-28, 20],
        anchor: "bottom",
      })
        .setLngLat([pinLoc.lng, pinLoc.lat])
        .setDOMContent(popupNode) // Pass the actual node
        .addTo(map.current!);

      bubblePopup.current = popup;

      if (map.current) {
        map.current.flyTo({
          center: [pinLoc.lng, pinLoc.lat],
          zoom: 16,
          essential: true,
        });
      }

      if (userLocation) {
        drawRoute(userLocation, { lat: pinLoc.lat, lng: pinLoc.lng });
      }
    },
    [
      userLocation,
      drawRoute,
      playButtonSound,
      COMPLETED_POI_IDS,
      selectedDestination,
      isPopupMinimized,
    ],
  );

  useEffect(() => {
    if (userLocation && selectedDestination) {
      const dist = haversineDistance(userLocation, {
        lat: selectedDestination.lat,
        lng: selectedDestination.lng,
      });

      setDistance(dist);
      setShowEnterAR(dist <= 15000);
    } else {
      setShowEnterAR(false);
      setDistance(null);
    }
  }, [userLocation, selectedDestination]);

  useEffect(() => {
    if (!selectedDestination || !bubblePopup.current) return;

    // This grabs the div we created in handlePinClick
    const popupElement = bubblePopup.current?.getElement();
    if (!popupElement) return;
    const container = popupElement.querySelector(".mapboxgl-popup-content");
    if (!container) return;

    // We clear and re-render the React content into the Mapbox popup
    const root = createRoot(container);
    root.render(
      <div
        style={{
          position: "relative",
          width: isPopupMinimized ? "50px" : "200px",
          height: isPopupMinimized ? "30px" : "200px",
        }}
      >
        {!isPopupMinimized && (
          <>
            {/* <PiShieldLight
                size={150}
                className=" text-white bg-[#A53D35] rounded-[20px]"
              /> */}
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[150px] h-[150px] text-[#A53D35]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L3 6v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4z" />
            </svg> */}

            <svg
              width="36"
              height="24"
              viewBox="0 0 36 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white w-[250px] h-[150px]"
            >
              <rect
                x="2"
                y="3"
                width="32"
                height="13"
                rx="2"
                ry="2"
                fill="currentColor"
              />
              <path d="M16 16 L18 21 L20 16 Z" fill="currentColor" />
            </svg>

            <div
              style={{
                position: "absolute",
                top: "30%",
                left: "60%",
                transform: "translate(-50%, -50%)",
                color: "black",
                fontWeight: "bold",
                fontSize: "12px",
                width: "70%",
                textAlign: "center",
                pointerEvents: "none",
              }}
            >
              <div className="text-center">
                <h1 className="font-bold text-[#A53D35] text-[12px]">{t(`p${selectedDestination.id}d`)}</h1>
                <div className="border-b my-1"></div>
                <p className="text-[12px] font-bold">{t(`p${selectedDestination.id}u`)}</p>
              </div>
              {/* {t2(stopTitle[selectedDestination.id - 1])} */}
            </div>
          </>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsPopupMinimized((prev) => !prev);
          }}
          style={{
            position: "absolute",
            top: isPopupMinimized ? "-40px" : "20px",
            right: isPopupMinimized ? "-32px" : "-25px",
            background: "white",
            // border: "1px solid #ccc",
            borderRadius: "50%",
            width: "24px",
            height: "24px",
            cursor: "pointer",
            zIndex: 20,
          }}
        >
          {isPopupMinimized ? "+" : "⛌"}
        </button>
      </div>,
    );

    return () => root.unmount();
  }, [isPopupMinimized, selectedDestination, t2]);

  return (
    <div className="relative w-full min-h-[80vh]">
      <div ref={mapContainer} className="w-full h-[80vh]" />

      {selectedDestination && distance !== null && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white text-backblack px-4 py-2 rounded shadow z-50 text-sm font-semibold flex items-center gap-2">
          <span className="text-blue-600">{distance.toFixed(2)} km</span>
        </div>
      )}

      {showEnterAR && selectedDestination && (
        <div className="fixed inset-0 p-4 flex flex-col items-center justify-center bg-black/70 z-50">
          <div className="relative w-[95%] mx-auto max-w-md bg-[#F5F3ED] rounded-2xl shadow-2xl p-3">
            <div className="space-y-4 flex flex-col">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-primary mb-2">
                  {t("congratulation")}
                </h2>
                <p className="text-gray-700 mb-4">{t("text")}</p>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <CustomButton
                  onClick={() =>
                    router.push(
                      `/mapa?lat=${selectedDestination.lat}&lng=${selectedDestination.lng}&poiId=${selectedDestination.id}`,
                    )
                  }
                  className="rounded-xl"
                >
                  {t("button")}
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      )}

      <CustomButton
        onClick={() => {
          if (userLocation) {
            setShouldFollowUser(true);
            map.current
              ?.flyTo({
                center: [userLocation.lng, userLocation.lat],
                zoom: 18,
              })
              .once("moveend", () => {
                setTimeout(() => setShouldFollowUser(false), 1000);
              });
          }
        }}
        className="absolute bottom-10 right-4 text-white px-[13px] py-3 rounded-lg shadow-lg z-50 !w-[51px]"
      >
        <TbFocusCentered size={24} />
      </CustomButton>
    </div>
  );
}
