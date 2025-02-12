import { ServiceCardProps } from "../types";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function ServiceCard({
  name,
  description,
  price,
  active,
}: ServiceCardProps) {
  return (
    <article className="w-full sm:w-[270px] h-[350px] rounded-20px flex flex-col p-10 justify-between cursor-pointer bg-brand_white relative">
      <section>
        <h1 className="text-brand_text_primary font-700 text-lg">{name}</h1>
        <p className="text-brand_text_secondary mt-2 font-700 text-[18px]">
          {description}
        </p>
      </section>

      <span className="absolute w-full h-full origin-center left-1/2 top-1/2 text-4xl text-brand_text_secondary/50">
        {active ? "active" : "disabled"}
      </span>

      <section>
        <h2 className="text-brand_text_primary font-700 text-4xl">{price}$</h2>
        <button className="text-brand_text_secondary hover:text-brand_text_primary transition duration-200 active:text-black mt-1 font-700 text-xl">
          Change
        </button>
      </section>
    </article>
  );
}
