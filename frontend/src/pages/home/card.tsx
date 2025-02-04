import { CardComponentProps } from "./types";

export default function Card({ card, onClick }: CardComponentProps) {
  return (
    <div
      onClick={() => onClick(card)}
      className="bg-brand_white rounded-20px flex flex-col gap-1 w-[90%] sm:w-[270px] p-4 cursor-pointer hover:shadow-xl hover:bg-brand_white/55 transition duration-300 group relative"
    >
      <span className="absolute top-5 right-5 rounded-12px bg-brand_orange text-brand_white font-600  px-2">
        {card.price}$
      </span>
      <img
        src={card.img}
        alt={card.fullname + " image"}
        className="w-full h-[262px] rounded-20px object-cover object-center group-hover:shadow-xl transition duration-300"
      />
      <p className="text-brand_text_primary font-700 mt-4 ml-4">
        {card.fullname}
      </p>
      <p className="text-brand_text_secondary font-600 ml-4">
        {card.describtion}
      </p>
    </div>
  );
}
