"use client";
import React from "react";
import Image from "next/image";
import Logo from "@/assets/mobileHlogo.svg";
import Menu from "../ui/Menu";
import icons from "@/assets/arrow.svg";
import game1 from "@/assets/mgame01.svg";
import game2 from "@/assets/mgame02.png";
import game3 from "@/assets/mgame03.svg";
import { GameData } from "@/app/(pages)/web/page";

interface ComingSoonProps {
  onGameSelect: (gameId: number) => void;
  onBack: () => void;
  games: GameData[];
}

const ComingSoon = ({ onGameSelect, onBack, games }: ComingSoonProps) => {
  const gameImages = [game1, game3, game3];

  return (
    <div className="desktop:flex tablet:flex mobile:block flex-col justify-center items-center min-h-[85vh] relative bg-white">
      <div className="desktop:max-w-[400px] tablet:max-w-[400px] mobile:w-full">
        <div className="flex justify-between items-center w-full px-3 pb-5 text-white h-[183px]">
          <div className="mt-4 w-[70px] cursor-pointer" onClick={onBack}>
            <Image src={icons} alt="Back" />
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
        <div className=" bg-[#ece7e3] min-h-[80vh] flex items-center justify-center">
          <h1 className="text-[24px] text-[#776864] text-center">
            PROPERAMENT ...
          </h1>
          
         
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
