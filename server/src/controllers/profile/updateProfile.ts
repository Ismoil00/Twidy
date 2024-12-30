import { Request, Response } from "express";
import { query } from "../../configs/db";
import { validate as isUUID } from "uuid";
import bcrypt from "bcrypt";
import { isNumeric, isString } from "../../helpers/validations";

const updateProfile = (req: Request, res: Response) => {};

export default updateProfile;
