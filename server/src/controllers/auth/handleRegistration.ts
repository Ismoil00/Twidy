import { Request, Response } from "express";
import { isString } from "../../helpers/validations";
import { query } from "../../configs/db";
import bcrypt from "bcrypt";
import { USER_EXISTANCE_BY_USERNAME } from "../../helpers/queries";

const handleRegistration = async (req: Request, res: Response) => {
  try {
    const { username, password, firstname, lastname } = req.body;

    // validtaion
    if (
      !isString(username) ||
      !isString(password) ||
      !isString(firstname) ||
      !isString(lastname)
    ) {
      res
        .status(400)
        .json({ error: "All fields are required for Registration" });
      return;
    }

    // username existance check
    const userExists = await query(USER_EXISTANCE_BY_USERNAME, [username]);
    if (userExists) {
      res.status(409).json({ error: "Username already exists" });
      return;
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      username,
      password: hashedPassword,
      firstname,
      lastname,
    };

    //saving new user to database
    const userSaved = await query("SELECT profile.upsert_user($1)", [
      JSON.stringify(user),
    ]);
    if (userSaved.status !== 200) throw new Error(userSaved);

    // response to the front
    res.status(200).json(userSaved);
  } catch (error) {
    console.error("ERROR in Registration: ", error);
    res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

export default handleRegistration;
