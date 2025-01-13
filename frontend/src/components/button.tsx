import React from "react";

interface ButtonTypes {
  text: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  style?: React.CSSProperties;
}

export default function Button({
  text,
  onClick,
  type = "button",
  style,
}: ButtonTypes): JSX.Element {
  return (
    <button
      onClick={onClick}
      type={type}
      style={style}
      className="text-brand_white bg-brand_blue px-8 py-3 rounded-20px tracking-wide w-full hover:bg-brand_blue/90 active:bg-brand_blue/80 transition-colors"
    >
      {text}
    </button>
  );
}
