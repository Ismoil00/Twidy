import { Request, Response } from "express";
import { isString } from "../../helpers/validations";
import { validate as isUUID } from "uuid";
import { query } from "../../configs/db";
import bcrypt from "bcrypt";

const updatePassword = async (req: Request, res: Response) => {
  try {
    const { oldPssword, newPassword, userId } = req.body;

    // validation
    if (!isString(oldPssword) || !isString(newPassword) || !isUUID(userId)) {
      res
        .status(400)
        .json({ error: "invalid oldPassword, newPassword or userId" });
      return;
    }

    const user = await query("SELECT profile.get_user_via_id($1)", [userId]);

    if (!user) {
      res
        .status(400)
        .json({ error: "User was not found while saving newPassword" });
      return;
    }

    const match = await bcrypt.compare(oldPssword, user.password);

    if (!match) {
      res.status(401).json({ error: "Incorrect old password" });
      return;
    }

    const response = await query("SELECT profile.update_password($1, $2)", [
      newPassword,
      userId,
    ]);

    res.send(200).json(response);
  } catch (error) {
    console.error("ERROR saving newPassword: ", error);
    res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

export default updatePassword;
