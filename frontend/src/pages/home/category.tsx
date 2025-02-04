import { CategoryComponentProps } from "./types";

export default function Category({
  category,
  onClick,
}: CategoryComponentProps) {
  return (
    <div
      onClick={() => onClick(category)}
      className="bg-brand_white rounded-20px flex justify-between items-center w-[90%] sm:w-[371px] p-3 cursor-pointer hover:shadow-xl hover:bg-brand_white/55 transition duration-300 group"
    >
      <p className="text-brand_text_primary font-700">{category.name}</p>
      <img
        className="w-28 h-20 rounded-20px object-cover object-center group-hover:shadow-xl transition duration-300"
        src={category.img}
        alt={category.name + " categrory"}
      />
    </div>
  );
}
