"use client";
import React from "react";

interface PrimaryBoxProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<PrimaryBoxProps> = ({
  children,
  className = "",
  onClick,
}) => {
  return (
    <div
      className={`border-b-5 border-[#355054] rounded-[12px] w-[114px] h-[119px] 
        flex flex-col gap-4 items-center justify-center bg-white cursor-pointer
         hover:bg-skin px-2 py-2 text-center relative overflow-hidden transition-all duration-400 ease-in-out hover:brightness-150 active:brightness-150 active:-translate-y-[5px] ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
