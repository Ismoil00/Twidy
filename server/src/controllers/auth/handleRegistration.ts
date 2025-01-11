import { Request, Response } from "express";
import { isString } from "../../helpers/validations";
import { query } from "../../configs/db";
import bcrypt from "bcrypt";
import { USER_EXISTANCE_BY_USERNAME } from "../../helpers/queries";

/* 
  - when user creates an account, he/she must verify the account via email/phone number;
  * if we add phone number, then there must be several things regarding the phone number:
    - country-number auto detection;
    - phone number validation;
    - phone number should be unique;
    - phone number should be verified via OTP or SMS;
*/

const handleRegistration = async (req: Request, res: Response) => {
  try {
    const { username, password, firstname, lastname, email } = req.body;

    // validtaion
    if (
      !isString(username) ||
      !isString(password) ||
      !isString(firstname) ||
      !isString(lastname) ||
      (isString(email) && !email.split("").includes("@"))
    ) {
      res.status(400).json({ error: "Check the authenticity of the fields" });
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
      email,
    };

    //saving new user to database
    const userSaved = await query("SELECT profile.insert_user_on_registration($1)", [
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
