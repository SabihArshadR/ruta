"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Card1 from "@/assets/card1.svg";
import Card2 from "@/assets/card2.svg";
import Card3 from "@/assets/card3.svg";
import Card4 from "@/assets/card4.svg";
import Card5 from "@/assets/card5.svg";
import Card6 from "@/assets/card6.svg";
import Logo from "@/assets/DashboardLogo.png";
import Card from "../ui/Card";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import SplashPopUp from "./Popup";
import SplashPopUp2 from "./Popup2";
import Welcome from "./Welcome";
import Intro from "./Intro";
import api from "@/lib/axios";
import { useUser } from "@/context/UserContext";
import CompletePopup from "./CompletePopup";
import { useCallback } from "react";
import Notification from "@/assets/notification.png";
import arrow from "@/assets/arrowwhite.svg";
import RutaIntroduction from "./RutaCompletion";

const Dashboard = () => {
  const { user, refreshUser, loading: userLoading } = useUser();
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations("Dashboard");
  const [loading, setLoading] = useState(false);
  const [ShowMorePopup, setShowMorePopup] = useState(false);
  const [ShowCompletePopup, setShowCompletePopup] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showMapNotification, setShowMapNotification] = useState(false);
  const [showAmicsNotification, setShowAmicsNotification] = useState(false);
  const [showSplashPopup2, setShowSplashPopup2] = useState(false);
  const [showRutaCompletion, setShowRutaCompletion] = useState(false);

  const playCardSound = useCallback(() => {
    try {
      const audio = new Audio("/button-sounds/4.mp3");
      audio
        .play()
        .catch((error) => console.error("Error playing sound:", error));
    } catch (error) {
      console.error("Error initializing sound:", error);
    }
  }, []);

  useEffect(() => {
    refreshUser();
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      setLoading(true);
      const timer = setTimeout(() => {
        localStorage.setItem("hasSeenWelcome", "true");
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user && status === "authenticated") {
      const currentPOIs = Array.isArray(user.completedPOIs)
        ? user.completedPOIs.length
        : 0;

      const lastSeenMapPOIsStr = localStorage.getItem("lastSeenMapPOIs");
      const lastSeenAmicsPOIsStr = localStorage.getItem("lastSeenAmicsPOIs");

      const lastSeenMapPOIs = lastSeenMapPOIsStr
        ? parseInt(lastSeenMapPOIsStr)
        : null;
      const lastSeenAmicsPOIs = lastSeenAmicsPOIsStr
        ? parseInt(lastSeenAmicsPOIsStr)
        : null;

      if (lastSeenMapPOIs === null || currentPOIs > lastSeenMapPOIs) {
        setShowMapNotification(true);
      } else {
        setShowMapNotification(false);
      }

      if (lastSeenAmicsPOIs === null || currentPOIs > lastSeenAmicsPOIs) {
        setShowAmicsNotification(true);
      } else {
        setShowAmicsNotification(false);
      }
    }
  }, [user, status, userLoading]);

  useEffect(() => {
    const checkIntro = async () => {
      if (user && user.hasSeenPopup === false) {
        setShowIntro(true);
      }
    };
    const checkPOI = async () => {
      if (user && user.POIsCompleted === 13) {
        setShowCompletePopup(true);
        setShowRutaCompletion(true);
      }
    };
    checkIntro();
    checkPOI();
  }, [user, status, userLoading]);

  const updateIntroStatus = async () => {
    try {
      await api.post("/user", {
        hasSeenPopup: true,
      });
    } catch (err: any) {
      console.error("Failed to update:", err.response?.data || err.message);
    }
  };

   const playButtonSound = useCallback(() => {
      try {
        const audio = new Audio('/button-sounds/5.mp3');
        audio.play().catch(error => console.error('Error playing sound:', error));
      } catch (error) {
        console.error('Error initializing sound:', error);
      }
    }, []);

  const handleMapClick = () => {
    playCardSound();
    if (user) {
      const completedCount = Array.isArray(user.completedPOIs)
        ? user.completedPOIs.length
        : 0;
      localStorage.setItem("lastSeenMapPOIs", completedCount.toString());
      setShowMapNotification(false);
    }

    if (
      user &&
      Array.isArray(user.completedPOIs) &&
      user.completedPOIs.length === 13
    ) {
      setShowCompletePopup(true);
    } else {
      router.push("/mapp");
    }
  };

  const handleAmicsClick = () => {
    playCardSound();
    if (user) {
      const completedCount = Array.isArray(user.completedPOIs)
        ? user.completedPOIs.length
        : 0;
      localStorage.setItem("lastSeenAmicsPOIs", completedCount.toString());
      setShowAmicsNotification(false);
    }
    router.push("/amics");
  };

  if (loading) return <Welcome />;

  // If game is completed, show only the RutaCompletion component
  if (showRutaCompletion) {
    return (
      <RutaIntroduction
        onLogin={() => {
          setShowRutaCompletion(false);
        }}
        onBack={() => setShowRutaCompletion(false)}
      />
    );
  }

  return (
    <>
      {ShowMorePopup && (
        <SplashPopUp
          handleClose={() => {
            setShowMorePopup(false);
            playButtonSound();
          }}
        />
      )}
      {/* {ShowCompletePopup && (
        <CompletePopup
          handleClose={() => {
            setShowCompletePopup(false);
          }}
        />
      )} */}
      {showSplashPopup2 && (
        <SplashPopUp2
          handleClose={() => {
            setShowSplashPopup2(false);
            playButtonSound();
          }}
        />
      )}
      {/* {showIntro && (
        <Intro
          handleClose={() => {
            setShowIntro(false);
            updateIntroStatus();
          }}
        />
      )} */}
      <div className="bg-backblack text-backblack pb-10">
        <div className="">
          <Image
            src={Logo}
            alt="Logo"
            className="object-cover h-[430px] w-[500px] object-[50%_10%]"
          />
        </div>
        <div className="flex justify-between mt-[33px] px-4 gap-4">
          <Card onClick={handleMapClick}>
            <Image src={Card1} alt="MAPA" className="w-[48px] h-[48px]" />
            <h1 className="text-center w-full break-words px-1 leading-4 font-extrabold text-[15px]">
              {t("card1")}
            </h1>
            {status === "authenticated" && showMapNotification && (
              // <div className="w-[15px] h-[15px] rounded-full bg-red-600 absolute top-2 right-2  animate-pulse"></div>
              <Image
                src={Notification}
                alt="Notification"
                className="absolute top-0 right-0 animate-pulse w-[40px] h-[40px]"
              />
            )}
          </Card>
          <Card
            onClick={() => {
              playCardSound();
              router.push("/progres");
            }}
          >
            <Image src={Card2} alt="PERFIL" className="w-[48px] h-[48px]" />
            <h1 className="text-center w-full break-words px-1 leading-4 font-extrabold text-[15px]">
              {t("card2")}
            </h1>
          </Card>
          <Card onClick={handleAmicsClick}>
            <Image src={Card3} alt="BANDOLERA" className="w-[48px] h-[48px]" />
            <h1 className="text-center w-full break-words leading-4 font-extrabold text-[14px]">
              {t("card3")}
            </h1>
            {status === "authenticated" && showAmicsNotification && (
              // <div className="w-[15px] h-[15px] rounded-full bg-red-600 absolute top-2 right-2  animate-pulse"></div>
              <Image
                src={Notification}
                alt="Notification"
                className="absolute top-0 right-0 animate-pulse w-[40px] h-[40px]"
              />
            )}
          </Card>
        </div>
        <div className="flex justify-between mt-[25px] px-4 gap-4">
          <Card
            onClick={() => {
              playCardSound();
              setShowMorePopup(true);
            }}
          >
            <Image
              src={Card4}
              alt="ARXIU HISTORIC"
              className="w-[48px] h-[48px]"
            />
            <h1 className="text-center w-full break-words px-1 leading-4 font-extrabold text-[15px]">
              {t("card4")}
            </h1>
          </Card>
          <Card
            onClick={() => {
              playCardSound();
              router.push("/faqs");
            }}
          >
            <Image src={Card5} alt="FAQ" className="w-[48px] h-[48px]" />
            <h1 className="text-center w-full break-words px-1 leading-4 font-extrabold text-[15px]">
              {t("card5")}
            </h1>
          </Card>
          <Card
            onClick={() => {
              playCardSound();
              setShowSplashPopup2(true);
            }}
          >
            <Image
              src={Card6}
              alt="SABER-NE MES"
              className="w-[48px] h-[48px]"
            />
            <h1 className="text-center w-full break-words px-1 leading-4 font-extrabold text-[15px]">
              {t("card6")}
            </h1>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
