import { Request, Response } from "express";
import { isString } from "../../helpers/validations";
import { query } from "../../configs/db";
import bcrypt from "bcrypt";
import {
  USER_EXISTANCE_BY_USERNAME,
  INSERT_USER_ON_REGISTRATION,
} from "../../helpers/queries";
import { ajv } from "../../helpers/validations";

const handleRegistration = async (req: Request, res: Response) => {
  try {
    //validation
    const validate = ajv.getSchema("registration");
    const valid = validate(req.body);
    if (!valid) {
      res.status(400).json({ errors: validate.errors });
      return;
    }

    const { username, password, firstname, lastname, email } = req.body;

    // username existance check
    const userExists = await query(USER_EXISTANCE_BY_USERNAME, [username]);
    if (userExists) {
      res.status(409).json({ error: "Username already exists" });
      return;
    }

    // password hashing
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

    //saving new user to database
    const newUserSave = await query(INSERT_USER_ON_REGISTRATION, [
      JSON.stringify(user),
    ]);
    if (newUserSave.status !== 200) throw new Error(newUserSave);

    // response to the front
    res.status(200).json(newUserSave);
  } catch (error) {
    console.error("ERROR in Registration: ", error);
    res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

export default handleRegistration;
