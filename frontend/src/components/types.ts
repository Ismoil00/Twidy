import { MouseEventHandler } from "react";

export interface ButtonTypes {
  text: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  tailwindUtilities?: string | undefined;
}

export interface InputType {
  type: string;
  name: string;
  value: string | number | readonly string[] | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label?: string;
  error?: boolean;
  inputTailwindUtilities?: string | undefined;
  labelTailwindUtilities?: string | undefined;
}

export interface TextareaType {
  name: string;
  value: string | number | readonly string[] | undefined;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  label?: string;
  error?: boolean;
  textareaTailwindUtilities?: string | undefined;
  labelTailwindUtilities?: string | undefined;
}

export interface DropdownOptionType {
  value: string | number;
  id: string | number;
}

export interface DropdownType {
  name: string;
  value: string | number | readonly string[] | undefined;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: DropdownOptionType[];
  label?: string;
  error?: boolean;
  dropdownTailwindUtilities?: string | undefined;
  labelTailwindUtilities?: string | undefined;
}
