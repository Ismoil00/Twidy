import { Request, Response } from "express";
import { isString } from "../../helpers/validations";
import { query } from "../../configs/db";
import { GET_USER_BY_USERNAME } from "../../helpers/queries";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const handleLogin = async (req: Request, res: Response) => {
  // Unique Tokens per Device;
  // Session Tracking: User ID, Device Information, IP Address, Refresh Token, Session Timestamps;
  // When session invalidated, we delete the session related data from the database;
  // How the user is gonna know: Simple Delition, WebSocket, or Polling;

  // username & password validation
  const { username, password } = req.body;

  if (!isString(username) || !isString(password)) {
    res.status(400).json({
      message: "Username and Password are required",
    });
    return;
  }

  // user existance check
  const user = await query(GET_USER_BY_USERNAME, [username]);
  if (!user) {
    res
      .status(401)
      .send({ message: "Invalid Credentials. User does not exist" });
    return;
  }

  // password match check
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res
      .status(401)
      .json({ message: "Invalid Credentials. Incorrect Password" });
    return;
  }

  // refresh token reuse detection + clearing it
  const cookies = req.cookies;
  // if (cookies.refreshToken) {
  //   if (cookies.refreshToken !== user.refreshToken) {
  //     console.error("Refresh-Token REUSE DETECTION: ", cookies.refreshToken);

  //     res.clearCookie("refreshToken", {
  //       httpOnly: true,
  //       sameSite: "none",
  //       secure: true,
  //     });

  //     // updateUserData({ ...user, refreshToken: null });

  //     return res.status(403).json({
  //       message: "Session compromised. Please log in again.",
  //     });
  //   }

  //   res.clearCookie("refreshToken", {
  //     httpOnly: true,
  //     sameSite: "none",
  //     secure: true,
  //   });
  // }

  // generating new refresh token + new access token

  // saving new device session

  // setting tokens and responding to the user
};

export default handleLogin;
