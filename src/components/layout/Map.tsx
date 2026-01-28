"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { POIs } from "@/utils/location";
import CoinMap from "./CoinMap";
import Loading from "./Loading";

const Map = () => {
  const router = useRouter();
  const { user, refreshUser } = useUser();

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    if (user === null) {
      // User is not logged in, redirect to login
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return <Loading />;
  }

  // Use the first POI that's not in completedPOIs array as the next destination
  // If all POIs are completed, default to the first one
  const completedSet = new Set(
    Array.isArray(user.completedPOIs) ? user.completedPOIs : []
  );
  const nextPOI =
    POIs.findIndex((_, index) => !completedSet.has(index + 1)) + 1;
  const destination = POIs[nextPOI > 0 ? nextPOI - 1 : 0];

  return (
    <div>
      {/* <CoinMap destination={destination} /> */}
      <CoinMap />
    </div>
  );
};

export default Map;
