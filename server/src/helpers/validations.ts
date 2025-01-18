import { registrationSchema } from "./schemas/registrationSchema";
import { loginSchema } from "./schemas/loginSchema";
import Ajv from "ajv";
import addErrors from "ajv-errors";
import addFormats from "ajv-formats";

export const ajv = new Ajv({ allErrors: true });
addErrors(ajv); // to enable custom error messages
addFormats(ajv); // to add formats for ajv

export function isNumeric(value: any): boolean {
  return /^-?\d+(\.\d+)?$/.test(value);
}

export function isString(value: any): boolean {
  if (typeof value === "string" && value !== "") return true;

  return false;
}

ajv.addSchema(registrationSchema, "registration");
ajv.addSchema(loginSchema, "login");
