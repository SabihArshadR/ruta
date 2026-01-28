"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Dashboard from "@/components/layout/Dashboard";
import DashboardWrapper from "@/layouts/DashboardWrapper";
import { useState, useEffect } from "react";
import GameSelector from "@/components/layout/GameSelector";
import HomePage from "@/components/layout/Web";
import RutaLogin from "@/components/layout/RutaLogin";
import RutaIntroduction from "@/components/layout/RutaIntroduction";
import Description from "@/components/layout/Description";
import RutaPopup from "@/components/layout/RutaPopup";
import ComingSoon from "@/components/layout/ComingSoon";
import CustomButton from "@/components/ui/Button";

export default function Home() {
  const [showCookies, setShowCookies] = useState(false);
  const [showRutaPopup, setShowRutaPopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenRutaPopup");
    if (!hasSeenPopup) {
      setShowRutaPopup(true);
      localStorage.setItem("hasSeenRutaPopup", "true");

      const timer = setTimeout(() => {
        setShowRutaPopup(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) {
      setShowCookies(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowCookies(false);
  };

  return (
    <>
      <div className="block desktop:hidden tablet:hidden">
        <RutaLogin />
        {showRutaPopup && <RutaPopup onClose={() => setShowRutaPopup(false)} />}
      </div>
      <div className="hidden desktop:block tablet:block">
        <HomePage />
      </div>
      {showCookies && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white px-4 py-3 flex items-center justify-between shadow-md z-50">
          <p className="text-sm">
            We use cookies to improve your experience. By using our site, you
            agree to our cookie policy.
          </p>
          <div className="flex flex-col gap-2">
            <CustomButton className="!text-xs !px-8" onClick={handleAccept}>
              Accept
            </CustomButton>
            <CustomButton
              className="!text-xs bg-red-600 !px-8"
              onClick={handleAccept}
            >
              Decline
            </CustomButton>
          </div>
        </div>
      )}
    </>
  );
}
