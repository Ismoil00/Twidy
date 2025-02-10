import { useState } from "react";
import { DropdownType, DropdownOptionType } from "./types";

export default function Dropdown({
  name,
  value,
  onChange,
  options,
  label,
  error = false,
  dropdownTailwindUtilities,
  labelTailwindUtilities,
}: DropdownType) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <label
        htmlFor={name}
        className={`input-label w-full tracking-wide font-700 ${
          error ? "text-brand_red" : "text-brand_text_primary"
        } ${labelTailwindUtilities}`}
      >
        {label || ""}
      </label>
      {/* Custom dropdown arrow */}
      <div className="relative group/selector">
        {isOpen ? (
          <svg
            className="w-5 fill-brand_blue absolute top-0 right-0 -translate-x-full rotate-180 translate-y-[10%] cursor-pointer group-hover/selector:fill-brand_text_primary transition duration-200"
            fill="none"
            height="50px"
            width="50px"
            viewBox="0 0 330 330"
            onClick={() => setIsOpen((p: boolean) => !p)}
          >
            <path
              id="XMLID_225_"
              d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
           c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
           s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
            />
          </svg>
        ) : (
          <svg
            className="w-5 fill-brand_blue absolute top-0 right-0 -translate-x-full translate-y-[10%] cursor-pointer group-hover/selector:fill-brand_text_primary transition duration-200"
            fill="none"
            height="50px"
            width="50px"
            viewBox="0 0 330 330"
            onClick={() => setIsOpen((p: boolean) => !p)}
          >
            <path
              id="XMLID_225_"
              d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
    c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
    s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
            />
          </svg>
        )}

        <select
          name={name}
          value={value}
          onChange={onChange}
          onClick={() => setIsOpen((p: boolean) => !p)}
          className={`input w-full px-5 py-3 mt-1 rounded-20px bg-brand_gray text-brand_text_secondary tracking-wide focus:outline-none transition duration-100 focus:ring-1 appearance-none placeholder-brand_text_secondary/30 cursor-pointer ${
            error
              ? "ring-1 ring-brand_red focus:shadow-error_red"
              : "focus:ring-brand_text_secondary/50"
          } ${dropdownTailwindUtilities}`}
        >
          {options.map((option: DropdownOptionType) => (
            <option
              key={option.id}
              value={option.value}
              className="cursor-pointer"
            >
              {option.value}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
