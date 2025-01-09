import { GET_USER_BY_USERNAME } from "../../helpers/queries";
import { userRandomData } from "../../helpers/randomHelpers";
import { isString } from "../../helpers/validations";
import { Request, Response } from "express";
import { query } from "../../configs/db";
import { NewSession } from "../types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const handleLogin = async (req: Request, res: Response) => {
  /* 
    - when new session created, we inform the user in other sessions [if exist];
    - when the current session deleted/user logs out, we delete the session from DB;
    - when another session is deleted from the current session, we not only delete but redirect the user to the login page on the device where the session was deleted;

    * Session Deactivation: Simple Delition, WebSocket, or Polling;
  */

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
  // if (!match) {
  //   res
  //     .status(401)
  //     .json({ message: "Invalid Credentials. Incorrect Password" });
  //   return;
  // }

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
  const forRefreshToken = userRandomData(user);
  const newRefreshToken = jwt.sign(
    { [forRefreshToken["key"]]: forRefreshToken["value"] },
    process.env.REFRESH_TOKEN_SECRET_KEY!,
    { expiresIn: "1d" }
  );
  const forAccessToken = userRandomData(user);
  const newAccessToken = jwt.sign(
    { [forAccessToken["key"]]: forAccessToken["value"] },
    process.env.ACCESS_TOKEN_SECRET_KEY!,
    { expiresIn: "15m" }
  );

  // saving new device session
  /* ---------------------------------------- */
  // const userDeviceInfo = {
  //   browser: req.useragent.browser,
  //   version: req.useragent.version,
  //   os: req.useragent.os,
  //   platform: req.useragent.platform,
  //   origin: req.useragent.source,
  // };
  // const ipAddress: string | string[] =
  //   req.headers["cf-connecting-ip"] ||
  //   req.headers["x-forwarded-for"] ||
  //   req.headers["x-real-ip"] ||
  //   req.socket.remoteAddress ||
  //   req.ip;
  // console.log("IP: ", ipAddress);
  // console.log("Device Info:", userDeviceInfo);
  /* ---------------------------------------- */

  const newSession: NewSession = {
    userId: user.userId,
    refreshToken: newRefreshToken,
    ip:
      req.headers["cf-connecting-ip"] ||
      req.headers["x-forwarded-for"] ||
      req.headers["x-real-ip"] ||
      req.socket.remoteAddress ||
      req.ip,
    device: {
      browser: req.useragent.browser,
      version: req.useragent.version,
      os: req.useragent.os,
      platform: req.useragent.platform,
      origin: req.useragent.source,
    },
  };

  console.log("newAccessToken: ", newAccessToken);
  console.log("New Session: ", newSession);

  res.send("success");
  return;

  // setting tokens and responding to the user
};

export default handleLogin;
