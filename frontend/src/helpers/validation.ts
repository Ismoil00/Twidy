import { loginSchema } from "./schemas/loginSchema";
import { registrationSchema } from "./schemas/registrationSchema";
import Ajv from "ajv";
import addErrors from "ajv-errors";
import addFormats from "ajv-formats";

export const ajv = new Ajv({ allErrors: true });
addErrors(ajv); // to enable custom error messages
addFormats(ajv); // to add formats for ajv

ajv.addSchema(registrationSchema, "registration");
ajv.addSchema(loginSchema, "login");