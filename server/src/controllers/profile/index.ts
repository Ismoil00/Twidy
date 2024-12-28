import { Request, Response, NextFunction } from "express";
import { query } from "../../configs/db";
import { validate as isUUID } from "uuid";
import bcrypt from "bcrypt";
import { isNumeric, isString } from "../../helpers/validations";

export const upsertUser = (req: Request, res: Response) => {};

export const updateUsername = async (req: Request, res: Response) => {
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

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { oldPssword, newPassword, userId } = req.body;

    // validation
    if (!isString(oldPssword) || !isString(newPassword) || !isUUID(userId)) {
      res
        .status(400)
        .json({ error: "invalid oldPassword, newPassword or userId" });
      return;
    }

    const user = await query("SELECT profile.get_user($1)", [userId]);

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

export const updateBankAccount = async (req: Request, res: Response) => {
  try {
    const { bankAccount, userId } = req.body;

    // validation
    if (!isNumeric(bankAccount) || !isUUID(userId)) {
      res
        .status(400)
        .json({ error: "invalid oldPassword, newPassword or userId" });
      return;
    }

    const response = await query("SELECT profile.update_bankAccount($1, $2)", [
      bankAccount,
      userId,
    ]);

    res.send(200).json(response);
  } catch (error) {
    console.error("ERROR updating bankAccount: ", error);

    if (error.message === "negative account is not permissible") {
      res.status(409).json({ error: error.message });
      return;
    }

    res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};
