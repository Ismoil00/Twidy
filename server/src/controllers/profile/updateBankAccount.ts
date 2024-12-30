import { Request, Response } from "express";
import { query } from "../../configs/db";
import { validate as isUUID } from "uuid";
import { isNumeric } from "../../helpers/validations";

const updateBankAccount = async (req: Request, res: Response) => {
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

export default updateBankAccount;
