import { useState } from "react";
import { ContactCardProps } from "../types";

export default function ContactCard({
  bgColor,
  icon,
  contactName,
  price,
  onContactChangeSave,
  handleContactPriceChange,
}: ContactCardProps) {
  const [changeMode, setChangeMode] = useState<boolean>(false);

  return (
    <div
      className={`${bgColor} w-full sm:w-[270px] h-[350px] rounded-20px flex flex-col p-10 justify-between`}
    >
      <section>
        <img src={`assets/${icon}.png`} alt={icon + " card icon"} />
        <p className="text-brand_white font-700 text-wrap w-20 text-xl mt-4">
          {contactName}
        </p>
      </section>
      <section>
        {changeMode ? (
          <input
            type="text"
            name="price"
            value={price === 0 ? "" : price}
            onChange={(e) => handleContactPriceChange(e, contactName)}
            className="bg-transparent/10 w-[185px] outline-none px-2 py-1 appearance-none text-brand_white font-700 rounded-md text-xl"
          />
        ) : (
          <h1 className="text-brand_white font-700 text-4xl">{price}$</h1>
        )}
        <button
          className="text-brand_white hover:text-brand_white/50 transition duration-200 font-700 text-xl mt-1"
          onClick={() => {
            setChangeMode((p: boolean) => !p);
            onContactChangeSave();
          }}
        >
          {changeMode ? "Save" : "Change"}
        </button>
      </section>
    </div>
  );
}
