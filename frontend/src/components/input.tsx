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
}: InputType) {
  return (
    <>
      <label
        htmlFor={name}
        style={labelStyle}
        className="input-label w-full text-brand_text_primary tracking-wide font-700"
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
        className="input w-full px-5 py-3 mt-1 rounded-20px bg-brand_gray text-brand_text_secondary tracking-wide focus:outline-none focus:ring-1 focus:ring-brand_text_secondary/50 placeholder-brand_text_secondary/30"
      />
    </>
  );
}
