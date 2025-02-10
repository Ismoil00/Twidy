import { SocialMediaProps } from "../types";

export default function SocialMedia({ icon, name, onClick }: SocialMediaProps) {
  return (
    <div
      onClick={onClick}
      className="w-[300px] h-fit p-5 flex gap-5 items-center rounded-20px bg-brand_white"
    >
      <img
        src={`assets/${icon}.png`}
        alt={name + " icon"}
        className="w-[50px] h-[50px] rounded-12px"
      />
      <p className="text-brand_text_primary font-700">{name}</p>
    </div>
  );
}
