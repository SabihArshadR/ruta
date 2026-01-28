"use client";
import Image from "next/image";
import React from "react";
import Logo from "@/assets/headertext.svg";
import User from "@/assets/icon_login.svg";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Menu from "../ui/Menu";
import { useSession, signOut } from "next-auth/react";
import arrow from "@/assets/arrowwhite.svg";
import { useCallback } from "react";
const Header = () => {
  const t = useTranslations("Head");
  const router = useRouter();
  const { data: session, status } = useSession();
  
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
      const audio = new Audio('/button-sounds/4.mp3');
      audio.play().catch(error => console.error('Error playing sound:', error));
    } catch (error) {
      console.error('Error initializing sound:', error);
    }
  }, []);

  const handleAuthClick = () => {
    if (status === "authenticated") {
      signOut({ callbackUrl: "/rutadefensacostest" });
    } else {
      router.push("/login");
    }
  };

  const handleBackClick = () => {
    playButtonSound();
    if (window.location.pathname === '/rutadefensacostest') {
      router.push("/ruta-introduction");
    } else if (window.location.pathname === '/login') {
      router.push("/rutadefensacostest");
    } else {
      router.back();
    }
  };
 
  return (
    <div
      className="flex justify-between items-center w-full px-3 text-white h-[183px]"
      style={{ backgroundImage: "url('/NavBar.svg')", backgroundSize: "cover" }}
    >
      <div className="mt-4 w-[70px]">
        {/* <Menu /> */}
        <Image src={arrow} alt="arrow" onClick={handleBackClick} className="ml-2.5 cursor-pointer" />
        <h1 className="text-base font-roboto-slab font-bold">
          {/* {t("title1")} */}
          {t("back")}
        </h1>
      </div>

      <div className="mt-[80px]">
        <Image src={Logo} alt="Logo" onClick={() => router.push("/rutadefensacostest")} />
      </div>

      <div
        className="flex items-end flex-col mt-2 w-[70px]"
        onClick={handleAuthClick}
      >
        <div className="flex flex-col justify-center items-center">
          <Image
          onClick={playButtonSound2}
            src={status === "authenticated" ? User : User}
            alt={status === "authenticated" ? "Logout" : "User"}
          />
          <h1 className="text-base font-bold text-center leading-6">
            {status === "authenticated" ? t("title3") : t("title2")}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
