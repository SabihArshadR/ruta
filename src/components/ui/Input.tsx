"use client";
import React from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: string; 
}

const CustomInput: React.FC<CustomInputProps> = ({
  className = "",
  type = "text",
  ...props
}) => {
  return (
    <input
      type={type}
      className={`border-2 border-[#C9C9C9] rounded-[8px] bg-[#f7f7f7] text-backblack px-3 py-2 
        text-base focus:outline-none w-full ${className}`}
      {...props}
    />
  );
};

export default CustomInput;
