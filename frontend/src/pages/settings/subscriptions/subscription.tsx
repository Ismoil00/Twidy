import { IoClose } from "react-icons/io5";
import { SubscriptionArticleCompProps } from "../types";

export default function SubscriptionArticle({
  sub,
}: SubscriptionArticleCompProps) {
  return (
    <>
      {/* DESKTOP + LAPTOP VERSION */}
      <article className="w-full p-3 rounded-16px hidden sm:flex justify-between items-center gap-2 bg-brand_white hover:shadow-xl transition duration-200 cursor-pointer">
        <div className="flex gap-4">
          <img
            src={`assets/${sub.image}`}
            alt={sub.fullname + " photo"}
            className="w-[70px] h-[75px] rounded-12px object-cover object-center"
          />
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <h2 className="text-brand_text_primary font-700">
                {sub.fullname}
              </h2>
              <p className="px-2 rounded-12px bg-brand_orange text-brand_white">
                {sub.price} $
              </p>
            </div>
            <p className="text-brand_text_secondary">{sub.description}</p>
          </div>
        </div>
        <p className="text-brand_text_secondary font-600">
          {sub.profession.join("/")}
        </p>
        <IoClose
          onClick={() => {}}
          className="size-8 text-brand_text_secondary cursor-pointer hover:text-brand_text_primary transition duration-200"
        />
      </article>

      {/* MOBILE VERSION */}
      <article className="w-full p-3 rounded-16px flex sm:hidden justify-between items-center gap-2 bg-brand_white hover:shadow-xl transition duration-200 cursor-pointer">
        <div className="flex gap-4">
          <img
            src={`assets/${sub.image}`}
            alt={sub.fullname + " photo"}
            className="w-[70px] rounded-12px object-cover object-center"
          />
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <h2 className="text-brand_text_primary font-700">
                {sub.fullname}
              </h2>
              <p className="px-2 rounded-12px bg-brand_orange text-brand_white">
                {sub.price} $
              </p>
            </div>
            <p className="text-brand_text_secondary">{sub.description}</p>
            <p className="text-brand_text_secondary">
              {sub.profession.join("/")}
            </p>
          </div>
        </div>
        <IoClose
          onClick={() => {}}
          className="size-8 text-brand_text_secondary cursor-pointer hover:text-brand_text_primary transition duration-200"
        />
      </article>
    </>
  );
}
