"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Profile from "@/assets/profileIcon.svg";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import { useUser } from "@/context/UserContext";
import { useSession } from "next-auth/react";
import RightArrow from "@/assets/rightarrow.svg";
import Pin from "@/assets/pin.svg";
import { useCallback } from "react";
import { FaCheck } from "react-icons/fa";

const Progress = () => {
  const { user, refreshUser } = useUser();
  const t = useTranslations("Progress");
  const router = useRouter();
  const { status } = useSession();

  const playPointSound = useCallback(() => {
    try {
      const audio = new Audio('/button-sounds/6.mp3');
      audio.play().catch(error => console.error('Error playing sound:', error));
    } catch (error) {
      console.error('Error initializing sound:', error);
    }
  }, []);

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

  return (
    <div className="bg-white">
      <div className="pt-[43px]">
        <h1 className="text-[22px] text-center font-semibold text-lightblack">
          {t("title1")} {user?.firstName}
        </h1>
      </div>

      <div className="mt-4 mb-6 flex justify-center">
        <Image
          src={Profile}
          alt="Profile Icon"
          className="w-[128px] h-[128px]"
        />
      </div>
      <div className="h-[128px] bg-[#A53D35]">
        <h1 className="font-bold font-poppins text-2xl text-white text-center pt-[22px]">
          {t("title2")}
        </h1>
        <p className="font-bold text-[40px] text-center text-[#E9E1D6]">
          {user?.points.toString()}
        </p>
      </div>
      <div className="">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((num) => {
          // Check if this POI is in the completedPOIs array
          const isCompleted = Array.isArray(user.completedPOIs)
            ? user.completedPOIs.includes(num)
            : false;
          return (
            <div
              key={num}
              className={`flex justify-between pl-5 py-3 ${
                isCompleted ? "bg-[#E9E1D6]" : "bg-[#f5f5f5]"
              } border-b border-white ${
                isCompleted
                  ? "cursor-default"
                  : "cursor-pointer hover:bg-[#d9d1c6]"
              } transition-colors`}
              onClick={() => {
                if (!isCompleted) {
                  playPointSound();
                  router.push(`/progress-mapa?poiId=${num}`);
                }
              }}
              role="button"
              tabIndex={isCompleted ? -1 : 0}
              onKeyDown={(e) =>
                !isCompleted &&
                e.key === "Enter" && 
                (() => {
                  playPointSound();
                  router.push(`/mapa?poiId=${num}`);
                })()
              }
            >
              <div className="flex">
                <Image src={Pin} alt="Pin" />
                <h1
                  className={`${
                    isCompleted ? "text-backblack" : "text-backblack"
                  } italic font-bold ml-5`}
                >
                  {t(`p${num}u`)}
                  <br />
                  {t(`p${num}d`)}
                </h1>
              </div>
              <div className="mr-3 flex flex-col justify-center">
                {isCompleted ? (
                  <FaCheck className="text-green-600 text-xl" />
                ) : (
                  <Image src={RightArrow} alt="RightArrow"/>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Progress;
