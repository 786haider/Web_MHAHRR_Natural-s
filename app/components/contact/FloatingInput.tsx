"use client";

import { InputHTMLAttributes } from "react";

interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FloatingInput({ label, id, ...props }: FloatingInputProps) {
  const inputId = id || props.name;
  
  return (
    <div className="relative group">
      <input
        id={inputId}
        className="w-full px-5 py-4 pt-6 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-800 transition-all duration-300 focus:outline-none focus:border-green-400 focus:bg-white focus:shadow-sm peer placeholder-transparent"
        {...props}
      />
      <label
        htmlFor={inputId}
        className="absolute left-5 top-4 text-xs font-semibold text-gray-400 uppercase tracking-wide transition-all duration-300 peer-focus:text-green-600 peer-focus:-translate-y-2 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:text-[10px]"
      >
        {label}
      </label>
    </div>
  );
}
