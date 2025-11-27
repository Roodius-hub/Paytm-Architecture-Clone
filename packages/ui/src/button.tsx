"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} type="button" className="font-weight: 500  px-5 py-2.5 me-2 mb-2 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg bg-[#0751cf] background-blend-mode: screen">
      {children}
    </button>
  );
};

//text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm 