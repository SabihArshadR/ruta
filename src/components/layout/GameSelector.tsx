"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import Logo from "@/assets/mobileHlogo.svg";
import Menu from "../ui/Menu";
import icons from "@/assets/arrow.svg";
import game1 from "@/assets/mgame01.svg";
import game2 from "@/assets/mgame02.png";
import game3 from "@/assets/mgame03.svg";
import { GameData } from "@/app/(pages)/web/page";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const GameSelector = () => {
  const gameImages = [game1, game3, game3];
  const router = useRouter();
  const t = useTranslations("Caminslogin");

  const playButtonSound = useCallback(() => {
    try {
      const audio = new Audio("/button-sounds/5.mp3");
      audio
        .play()
        .catch((error) => console.error("Error playing sound:", error));
    } catch (error) {
      console.error("Error initializing sound:", error);
    }
  }, []);

  return (
    <div className="desktop:flex tablet:flex mobile:block flex-col justify-center items-center min-h-[85vh] relative bg-white">
      <div className="desktop:max-w-[400px] tablet:max-w-[400px] mobile:w-full">
        <div className="flex justify-between items-center w-full px-3 pb-5 text-white h-[183px]">
          <div className="mt-4 w-[70px] cursor-pointer">
            <Image
              src={icons}
              alt="Back"
              onClick={() => {
                playButtonSound();
                router.push("/");
              }}
            />
          </div>

          <div className="mt-[34px] flex justify-center">
            <Image src={Logo} alt="Logo" className="w-[201px] h-[115px]" />
          </div>

          <div className="flex items-end flex-col mt-2 w-[70px]">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-base font-bold text-center leading-6"></h1>
            </div>
          </div>
        </div>
        <div className=" bg-[#ece7e3] pb-10">
          <h1 className="text-[20px] text-[#160500] text-center pt-10">
            {t("game")}
          </h1>
          <div className="flex justify-center mx-5">
            <div className="grid grid-cols-1 gap-6 mt-[30px]">
              {gameImages.map((game, index) => (
                <Image
                  key={game.id}
                  src={gameImages[index] || game3}
                  alt={game.title}
                  className={`h-[155px] ${
                    index === 0
                      ? "cursor-pointer hover:opacity-80"
                      : "opacity-70"
                  }`}
                  onClick={() => index === 0 && router.push("/description")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSelector;
