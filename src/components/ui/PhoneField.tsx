"use client";
import React from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const CustomPhoneInput: React.FC<CustomInputProps> = ({
  className = "",
  ...props
}) => {
  return (
    <div className="flex border-2 border-[#C9C9C9] rounded-[8px] overflow-hidden w-full bg-[#f7f7f7] text-backblack">
      <div className="bg-[#C9C9C9] flex items-center justify-center px-3 border-r-2 border-[#C9C9C9]">
        <span className="text- text-xs text-white">▼</span>
      </div>

      <input
        type="text"
        className={`flex-1 px-3 py-2 text-base outline-none ${className}`}
        {...props}
      />
    </div>
  );
};

export default CustomPhoneInput;
