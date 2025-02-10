import { TextareaType } from "./types";

export default function Textarea({
  name,
  value,
  onChange,
  placeholder,
  label,
  error = false,
  textareaTailwindUtilities,
  labelTailwindUtilities,
}: TextareaType) {
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
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input w-full px-5 py-3 mt-1 rounded-20px bg-brand_gray text-brand_text_secondary tracking-wide focus:outline-none transition duration-100 focus:ring-1 placeholder-brand_text_secondary/30 ${
          error
            ? "ring-1 ring-brand_red focus:shadow-error_red"
            : "focus:ring-brand_text_secondary/50"
        } ${textareaTailwindUtilities}`}
      />
    </>
  );
}
