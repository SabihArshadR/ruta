"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import Logo from "@/assets/mobileHlogo.svg";
import icons from "@/assets/arrow.svg";
import game1 from "@/assets/mgame01.png";
import game2 from "@/assets/mgame02.png";
import game3 from "@/assets/mgame03.png";
import Text from "@/assets/headertext.svg";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const Description = () => {
  // Map game images based on game ID or image name
  const getGameImage = () => {
    const gameImages: { [key: string]: any } = {
      "mgame01.png": game1,
      "mgame02.png": game2,
      "mgame03.png": game3,
    };
  };
  const router = useRouter();
  const t = useTranslations("Description");
  const t2 = useTranslations("Rutaintro");

  const playButtonSound = useCallback(() => {
      try {
        const audio = new Audio('/button-sounds/5.mp3');
        audio.play().catch(error => console.error('Error playing sound:', error));
      } catch (error) {
        console.error('Error initializing sound:', error);
      }
    }, []);

    const playButtonSound2 = useCallback(() => {
          try {
            const audio = new Audio('/button-sounds/3.mp3');
            audio.play().catch(error => console.error('Error playing sound:', error));
          } catch (error) {
            console.error('Error initializing sound:', error);
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
              onClick={() => {playButtonSound(); router.push("/game-select")}}
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
        <div className=" bg-[#ece7e3] pb-5">
          <div className="flex">
            <div
              className="w-full h-[244px] bg-cover bg-center no-repeat"
              style={{ backgroundImage: "url('/mgamed1.svg')" }}
            >
              <Image src={Text} alt="Logo" className="mt-[154px] ml-10" />
            </div>
          </div>
          <div className="ml-[38px] mt-10">
            <h1 className="text-[#A82B00] mt-5">{t("text2")}</h1>
            <p className="text-[#160500] max-w-[337px] mt-2">
              {t("text3")}
            </p>
            <h1 className="text-[#A82B00] mt-5">{t("text4")}</h1>
            <p className="text-[#160500] mt-2">{t("text5")}</p>
            <h1 className="text-[#A82B00] mt-5">{t("text6")}</h1>
            <p className="text-[#160500] max-w-[337px] mt-2">
              {t("text7")}
            </p>
            <h1 className="text-[#A82B00] mt-5">{t("text8")}</h1>
            <p className="text-[#160500] max-w-[337px] mt-2">
              {t("text9")}
            </p>
            <h1 className="text-[#A82B00] mt-5">{t("text10")}</h1>
            <p className="text-[#160500] max-w-[337px] mt-2">
              {t("text11")}
            </p>
          </div>
          <div className="mt-[130px] flex justify-center mx-5">
            <button onClick={()=>{playButtonSound2(); router.push("/ruta-introduction")}}
              className="bg-[#A82B00] rounded-[8px] text-[20px] text-white
              font-bold py-2 max-w-[399px] w-full hover:cursor-pointer px-2 hover:opacity-90 transition-opacity transition-all duration-400 ease-in-out hover:brightness-150 active:brightness-150 active:-translate-y-[5px]"
            >
              {t2("button")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
