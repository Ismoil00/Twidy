import { ContactCardProps } from "../types";

export default function ContactCard({
  bgColor,
  icon,
  contactName,
  price,
  onChangeContact,
}: ContactCardProps) {
  return (
    <div
      className={`${bgColor} w-[270px] h-[350px] rounded-20px flex flex-col p-10 justify-between cursor-pointer`}
    >
      <section>
        <img src={`assets/${icon}.png`} alt={icon + " card icon"} />
        <p className="text-brand_white font-700 text-wrap w-20 text-xl mt-4">
          {contactName}
        </p>
      </section>
      <section>
        <h1 className="text-brand_white font-700 text-4xl">{price}$</h1>
        <button
          className="text-brand_white font-700 text-xl mt-1"
          onClick={onChangeContact}
        >
          Change
        </button>
      </section>
    </div>
  );
}
