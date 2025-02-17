import { Request, Response } from "express";
import { query } from "../../configs/db";
import bcrypt from "bcrypt";
import {
  USER_EXISTANCE_BY_USERNAME,
  INSERT_USER_ON_REGISTRATION,
} from "../../helpers/queries";
import { ajv } from "../../helpers/validations";

const handleRegistration = async (req: Request, res: Response) => {
  try {
    /* VALIDATION */
    const validate = ajv.getSchema("registration");
    const valid = validate(req.body);
    if (!valid) {
      res.status(400).json({ message: validate.errors });
      return;
    }

    const { username, password, firstname, lastname, email } = req.body;

    /* USERNAME EXISTANCE CHECK */
    const userExists = await query(USER_EXISTANCE_BY_USERNAME, [username]);
    if (userExists) {
      res.status(409).json({ message: "Username already exists" });
      return;
    }

    /* PASSWORD HASHING */
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: {
      [index: string]: string;
    } = {
      username,
      password: hashedPassword,
      firstname,
      lastname,
      email,
    };

    /* SAVING NEW USER TO DB */
    const newUserSave = await query(INSERT_USER_ON_REGISTRATION, [
      JSON.stringify(user),
    ]);
    if (newUserSave.status !== 200) throw new Error(newUserSave);

    res.status(200).json(newUserSave);
  } catch (error) {
    console.error("ERROR in Registration: ", error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

export default handleRegistration;
