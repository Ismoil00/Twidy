import { ButtonTypes } from "./types";

export default function Button({
  text,
  onClick,
  type = "button",
  tailwindUtilities,
}: ButtonTypes): JSX.Element {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`text-brand_white bg-brand_blue px-8 py-3 rounded-20px tracking-wide w-full hover:bg-brand_blue/90 active:bg-brand_blue/80 transition-colors ${tailwindUtilities}`}
    >
      {text}
    </button>
  );
}
