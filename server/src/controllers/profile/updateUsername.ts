import { Request, Response } from "express";
import { isString } from "../../helpers/validations";
import { validate as isUUID } from "uuid";
import { query } from "../../configs/db";

const updateUsername = async (req: Request, res: Response) => {
  try {
    const { username, userId } = req.body;

    // validation
    if (!isString(username) || !isUUID(userId)) {
      res.status(400).json({ error: "invalid username or userId" });
      return;
    }

    const response = await query("SELECT profile.update_username($1, $2)", [
      username,
      userId,
    ]);

    res.send(200).json(response);
  } catch (error) {
    console.error("ERROR saving newUsername: ", error);

    if (error.message === "username already exists") {
      res.status(409).json({ error: error.message });
      return;
    }

    res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

export default updateUsername;
