import { userRandomData } from "../../helpers/randomHelpers";
import { Request, Response } from "express";
import { query } from "../../configs/db";
import { NewSession } from "../types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  INSERT_NEW_SESSION,
  GET_ALL_USER_REFRESHTOKENS,
  SAVE_REUSED_REFRESHTOKEN,
  DEELTE_SESSION_VIA_REFRESHTOKEN,
  GET_USER_BY_USERNAME,
} from "../../helpers/queries";
import { cookieParams, cookieParamsWithoutAge } from "../../helpers/constants";
import { ajv } from "../../helpers/validations";

const handleLogin = async (req: Request, res: Response) => {
  //validation
  const validate = ajv.getSchema("login");
  const valid = validate(req.body);
  if (!valid) {
    res.status(400).json({ msg: validate.errors });
    return;
  }

  const { username, password } = req.body;

  // user existance check
  const user = await query(GET_USER_BY_USERNAME, [username]);
  if (!user) {
    res.status(401).send({ msg: "Invalid Credentials. User does not exist" });
    return;
  }

  // password match check
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(401).json({ msg: "Invalid Credentials. Incorrect Password" });
    return;
  }
  // refresh token reuse detection + clearing it
  const cookies = req.cookies;
  if (cookies.refreshToken) {
    try {
      const data = await query(GET_ALL_USER_REFRESHTOKENS, [user["userId"]]);
      if (data.status !== 200) throw data;

      if (!data["refreshTokens"]?.includes(cookies.refreshToken)) {
        console.error("Refresh-Token REUSE DETECTION");

        await query(SAVE_REUSED_REFRESHTOKEN, [
          user["userId"],
          cookies.refreshToken,
        ]);
        res.clearCookie("refreshToken", cookieParamsWithoutAge);
        res.status(403).json({
          msg: "Session compromised. Please log in again",
          redirect: "/login",
        });
        return;
      }

      const sessionDeleted = await query(DEELTE_SESSION_VIA_REFRESHTOKEN, [
        cookies.refreshToken,
      ]);
      if (sessionDeleted.status !== 200) throw sessionDeleted;
      res.clearCookie("refreshToken", cookieParamsWithoutAge);
    } catch (error) {
      console.error("ERROR in Login: ", error);
      res.status(500).json({
        msg: `Session compromised. Please log in again: ${error}`,
        redirect: "/login",
      });
      return;
    }
  }

  // generating new refresh token
  const forRefreshToken = userRandomData(user);
  const newRefreshToken = jwt.sign(
    { [forRefreshToken["key"]]: forRefreshToken["value"] },
    process.env.REFRESH_TOKEN_SECRET_KEY!,
    { expiresIn: "1d" }
  );

  // saving new device session
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

  try {
    const newSessionSave = await query(INSERT_NEW_SESSION, [
      JSON.stringify(newSession),
    ]);
    if (newSessionSave.status !== 200) throw new Error(newSessionSave);

    // generating new refresh token
    const forAccessToken = userRandomData(user);
    const newAccessToken = jwt.sign(
      {
        [forAccessToken["key"]]: forAccessToken["value"],
        sessionId: newSessionSave["sessionId"],
      },
      process.env.ACCESS_TOKEN_SECRET_KEY!,
      { expiresIn: "15m" }
    );

    // user response
    res.cookie("refreshToken", newRefreshToken, cookieParams);
    res.setHeader("authorization", "Bearer " + newAccessToken);
    res.status(200).json({
      userId: user["userId"],
      sessionId: newSessionSave["sessionId"],
      fullname: `${user["firstname"]} ${user["lastname"]}`,
    });
  } catch (error) {
    console.error("ERROR in Login: ", error);
    res.status(500).json({ msg: `Internal Server Error: ${error}` });
  }
};

export default handleLogin;
