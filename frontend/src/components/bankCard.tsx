import React, { useState } from "react";
// import { BankCardProps } from "./types";

interface BankCardProps {
  id: string | number;
  type: string;
  number: number;
  expiry: string;
  cvc: string;
  name: string;
  default: boolean;
}

export default function BankCard({ type, number, name }: BankCardProps) {
  // const [state, setState] = useState<BankCardProps>({
  //   number: "",
  //   expiry: "",
  //   cvc: "",
  //   name: "",
  // });

  return (
    <div className="max-w-[325px] p-5 h-[200px] rounded-20px bg-gradient-to-r from-brand_blue to-brand_light_blue flex flex-col justify-between cursor-pointer">
      <h1 className="text-brand_white font-extrabold text-2xl uppercase">
        {type}
      </h1>
      <p className="text-brand_white font-700 tracking-wide">
        {`${String(number).slice(0, 3)}........${String(number).slice(-3)}`}
      </p>
      <p className="text-brand_white uppercase font-700">{name}</p>
    </div>
  );
}
