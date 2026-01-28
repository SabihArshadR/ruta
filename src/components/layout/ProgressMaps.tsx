"use client";
import Image from "next/image";
import React, { useCallback } from "react";
import Map from "@/assets/map.svg";
import Ribbon from "@/assets/RIBBON.svg";
import CustomButton from "../ui/Button";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import Loading from "./Loading";

const stop = [
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eighth",
  "ninth",
  "tenth",
  "eleventh",
  "twelfth",
  "thirteenth",
];

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

const ProgressMaps = () => {
  const { user } = useUser();
  const t = useTranslations("Map");
  const router = useRouter();
  const { status } = useSession();
  const searchParams = useSearchParams();

  // If we arrive from CoinMap with a specific POI we will receive its id + coords
  const poiIdParam = searchParams.get("poiId");
  const latParam = searchParams.get("lat");
  const lngParam = searchParams.get("lng");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return null;
  }

  if (status === "unauthenticated") {
    return null;
  }

  if (!user) return <Loading />;

  const playButtonSound = useCallback(() => {
      try {
        const audio = new Audio('/button-sounds/3.mp3');
        audio.play().catch(error => console.error('Error playing sound:', error));
      } catch (error) {
        console.error('Error initializing sound:', error);
      }
    }, []);

  // Decide which POI to show: clicked one (when coming from CoinMap) or next pending POI by default
  const activePOIIndex = poiIdParam
    ? Number(poiIdParam) - 1
    : user?.POIsCompleted;
  const destination = stop[activePOIIndex];
  const destinationTitle = stopTitle[activePOIIndex];

  return (
    <div className="bg-white min-h-[80vh]">
      <div className="flex justify-center">
        <Image src={Map} alt="Map" className="mt-[62px] w-[246px] h-[246px]" />
      </div>
      <div className="relative bg-[#AD3F37] flex items-center justify-center py-24 slope-bg top-[40px]">
        <h1
          className={`font-oswald text-4xl leading-[44px] font-bold text-white captalize text-center ${
            destinationTitle === "ninth_title" ? "px-[70px]" : "px-5"
          }`}
        >
          {t(destinationTitle)}
        </h1>
      </div>
      {/* <h1 className="text-2xl font-bold text-center text-blue mt-[44px]">
        {t(destination)} {t("title1")}
      </h1>
      <h1 className="text-[36px] font-medium text-center text-lightblack mt-[10px] leading-8">
        {t(destinationTitle)}
      </h1> */}
      <div className="bg-white pb-10">
        <div className="px-3.5">
          {/* <p className="text-backblack text-base pt-[60px]">{t("text2")}</p> */}
        </div>
        <div className="flex flex-col justify-center items-center px-3.5 mt-[10vh]">
          <CustomButton
            onClick={() => {
              if (poiIdParam) {
                // User arrived from Progress page (only poiId is provided)
                // Navigate directly to CoinMap so the user can geolocate and approach the POI
                router.push(`/progress-mapp?poiId=${poiIdParam}`);
              } else {
                // Fallback: open interactive CoinMap without a pre-selected POI
                router.push("/mapp");
              }
              playButtonSound();
            }}
          >
            {t("button")}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ProgressMaps;
