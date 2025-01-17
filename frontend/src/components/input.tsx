import React from "react";

interface InputType {
  type: string;
  name: string;
  value: string | number | readonly string[] | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  style?: React.CSSProperties;
  label: string;
  labelStyle?: React.CSSProperties;
  error?: boolean;
}

export default function Input({
  type,
  name,
  value,
  onChange,
  placeholder,
  style,
  label,
  labelStyle,
  error = false,
}: InputType) {
  return (
    <>
      <label
        htmlFor={name}
        style={labelStyle}
        className={`input-label w-full tracking-wide font-700 ${
          error ? "text-brand_red" : "text-brand_text_primary"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={style}
        className={`input w-full px-5 py-3 mt-1 rounded-20px bg-brand_gray text-brand_text_secondary tracking-wide focus:outline-none focus:ring-1  placeholder-brand_text_secondary/30 ${
          error
            ? "ring-1 ring-brand_red focus:shadow-error_red"
            : "focus:ring-brand_text_secondary/50"
        }`}
      />
    </>
  );
}
