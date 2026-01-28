"use client";
import Image, { StaticImageData } from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useUser } from "@/context/UserContext";
import ModelViewer from "./ModelViewer";
import { FaLock , FaCheck} from "react-icons/fa";

import Item from "@/assets/ITEM01.svg";

interface Finding {
  img: StaticImageData;
  model: string;
  altKey: string;
  zoom: "moreless" | "less" | "normal" | "large";
  rotation?: number[];
  position?: number[];
}

const Amics = () => {
  const t = useTranslations("Amics");
  const router = useRouter();
  const { status } = useSession();
  const { user } = useUser();
  const [unlockedPOIs, setUnlockedPOIs] = useState<number[]>([]);
  const [activeModel, setActiveModel] = useState<string | null>(null);
  const [activeModelZoom, setActiveModelZoom] = useState<string | null>(
    "normal"
  );
  const [isLoading, setIsLoading] = useState(true);

  const getBaseUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    return process.env.NEXTAUTH_URL || "http://localhost:3000";
  };

  const HOST = getBaseUrl();

  const findings: Finding[] = [
    {
      img: Item,
      model: `${HOST}/models/1.glb`,
      altKey: "finding1",
      zoom: "moreless",
      rotation: [0, Math.PI / 0.49, 0],
      position: [0, 0.7, 0],
    },
    {
      img: Item,
      model: `${HOST}/models/2.glb`,
      altKey: "finding2",
      zoom: "moreless",
      rotation: [0, Math.PI / 0.1, 0],
      position: [0, 0.7, 0],
    },
    {
      img: Item,
      model: `${HOST}/models/3.glb`,
      altKey: "finding3",
      zoom: "moreless",
      rotation: [1.6, Math.PI / 0.4, 0],
      position: [0.01, 0.7, 0],
    },
    {
      img: Item,
      model: `${HOST}/models/4.glb`,
      altKey: "finding4",
      zoom: "moreless",
      rotation: [0, Math.PI / 0.25, 0],
      position: [0, 0.7, 0],
    },
    {
      img: Item,
      model: `${HOST}/models/5.glb`,
      altKey: "finding5",
      zoom: "moreless",
      rotation: [0, Math.PI / 0.67, 0],
      position: [0, 0.7, 0],
    },
    {
      img: Item,
      model: `${HOST}/models/6.glb`,
      altKey: "finding6",
      zoom: "moreless",
      rotation: [0, Math.PI / 0.1, 0],
      position: [0.01, 0.7, 0],
    },
    {
      img: Item,
      model: `${HOST}/models/7.glb`,
      altKey: "finding7",
      zoom: "moreless",
      rotation: [0, Math.PI / 0.1, 0],
      position: [0.02, 0.7, 0],
    },
    {
      img: Item,
      model: `${HOST}/models/8.glb`,
      altKey: "finding8",
      zoom: "moreless",
      rotation: [0, Math.PI / 0.65, 0],
      position: [0.015, 0.7, 0],
    },
    {
      img: Item,
      model: `${HOST}/models/9.glb`,
      altKey: "finding9",
      zoom: "moreless",
      position: [0, 0.7, 0],
    },
    {
      img: Item,
      model: `${HOST}/models/10.glb`,
      altKey: "finding10",
      zoom: "moreless",
      rotation: [0, Math.PI / 0.9, 0],
      position: [0.01, 0.7, 0],
    },
    {
      img: Item,
      model: `${HOST}/models/11.glb`,
      altKey: "finding11",
      zoom: "moreless",
      rotation: [0, Math.PI / 0.43, 0],
      position: [0.04, 0.7, 0],
    },
    {
      img: Item,
      model: `${HOST}/models/12.glb`,
      altKey: "finding12",
      zoom: "moreless",
      rotation: [0, Math.PI / 0.8, 0],
      position: [0.05, 0.7, 0],
    },
    {
      img: Item,
      model: `${HOST}/models/13.glb`,
      altKey: "finding13",
      zoom: "moreless",
      rotation: [0, Math.PI / 0.8, 0],
      position: [0.05, 0.7, 0],
    },
  ];

  const playButtonSound = useCallback(() => {
    try {
      const audio = new Audio("/button-sounds/8.mp3");
      audio
        .play()
        .catch((error) => console.error("Error playing sound:", error));
    } catch (error) {
      console.error("Error initializing audio:", error);
    }
  }, []);

  const playCloseSound = useCallback(() => {
    try {
      const audio = new Audio("/button-sounds/9.mp3");
      audio
        .play()
        .catch((error) => console.error("Error playing close sound:", error));
    } catch (error) {
      console.error("Error initializing close sound:", error);
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      setIsLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (user) {
      // Use the completedPOIs array if it exists, otherwise fall back to the count
      setUnlockedPOIs(
        Array.isArray(user.completedPOIs)
          ? user.completedPOIs
          : user.POIsCompleted
            ? Array.from({ length: user.POIsCompleted }, (_, i) => i)
            : [],
      );
    }
  }, [user]);

  const handleClick = (index: number) => {
    // Check if this POI is in the unlockedPOIs array
    if (unlockedPOIs.includes(index + 1)) {
      // +1 because POIs are 1-indexed in the database
      playButtonSound();
      setActiveModel(findings[index].model);
      setActiveModelZoom(findings[index].zoom);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lightgreen"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="flex flex-col items-center bg-white pb-10 md:pb-32">
      <div className="bg-lightskin w-full flex h-24 md:h-28 items-center justify-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-backblack text-center">
          {t("title")}
        </h1>
      </div>

      <div className="mt-8 w-full max-w-4xl pb-10">
        <div className="grid grid-cols-2 gap-5 w-full px-5 justify-items-center">
          {findings.map((item, index) => {
            // POIs are 1-indexed in the database, so we add 1 to the index
            const isUnlocked = unlockedPOIs.includes(index + 1);
            return (
              <div
                key={index}
                className="w-[170px] h-[170px] rounded-[12px]"
                style={{
                  backgroundImage: "url(/bg.svg)",
                  backgroundSize: "cover",
                }}
              >
                <div
                  className={`relative aspect-square transition-all duration-300 ${
                    !isUnlocked
                      ? "opacity-50"
                      : "hover:scale-105 cursor-pointer"
                  }`}
                >
                  <button
                    onClick={() => handleClick(index)}
                    disabled={!isUnlocked}
                    className="w-full h-full"
                  >
                    <Image
                      src={item.img}
                      alt="img"
                      className="w-[170px] h-[170px]"
                    />

                    {/* LOCKED ICON */}
                    {!isUnlocked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {/* <svg
                          className="w-8 h-8 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg> */}
                        <FaLock className="w-8 h-8 " />
                      </div>
                    )}
                    {/* ✅ UNLOCKED CHECK ICON (CENTERED) */}
                    {isUnlocked && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-lightgreen rounded-full p-2">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {/* <FaChek /> */}
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ModelViewer
        modelPath={activeModel || ""}
        rotation={
          (findings.find((f) => f.model === activeModel)?.rotation || [
            0, 0, 0,
          ]) as [number, number, number]
        }
        position={
          (findings.find((f) => f.model === activeModel)?.position || [
            0, 0, 0,
          ]) as [number, number, number]
        }
        isOpen={!!activeModel}
        onClose={() => {
          playCloseSound();
          setActiveModel(null);
        }}
        zoomMode={
          (activeModelZoom as "normal" | "moreless" | "less" | "large") ??
          "normal"
        }
      />
    </div>
  );
};

export default Amics;
