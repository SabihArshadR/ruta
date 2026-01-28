"use client";
import React from "react";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`bg-darkgreen rounded-[8px] text-[20px] text-white font-bold py-2 px-2 max-w-[499px] w-full cursor-pointer transition-all duration-400 ease-in-out hover:brightness-150 active:brightness-150 active:-translate-y-[5px] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
