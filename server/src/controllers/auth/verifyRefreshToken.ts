import { Request, Response } from "express";
import { query } from "../../configs/db";
import jwt from "jsonwebtoken";
import { cookieParamsWithoutAge, cookieParams } from "../../helpers/constants";
import {
  GET_SESSION_VIA_REFRESHTOKEN,
  SAVE_REUSED_REFRESHTOKEN,
  DEELTE_SESSION_VIA_REFRESHTOKEN,
  UPDATE_SESSION_REFRESHTOKEN,
} from "../../helpers/queries";

const verifyRefreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken: string = req.cookies["refreshToken"];

    if (!refreshToken) {
      res.status(403).statusMessage = "RedirectToLoginPage";
      res.json({ msg: "Refresh-Token is missing", redirect: "/login" });
      return;
    }

    res.clearCookie("refreshToken", cookieParamsWithoutAge);
    const session = await query(GET_SESSION_VIA_REFRESHTOKEN, [refreshToken]);
    if (session["status"] !== 200) throw session;

    // reuse detection:
    if (!session["session"]) {
      await query(SAVE_REUSED_REFRESHTOKEN, [
        session["session"]["userId"],
        refreshToken,
      ]);

      res.status(403).statusMessage = "RedirectToLoginPage";
      res.json({
        msg: "User Refresh-Token is hacked. Please log in again",
        redirect: "/login",
      });
      return;
    }

    // token varification
    let refreshTokenExpired = false;
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      async (err, decoded) => {
        if (err) {
          refreshTokenExpired = true;
          console.error("RefreshToken has expired");

          const response = await query(DEELTE_SESSION_VIA_REFRESHTOKEN, [
            refreshToken,
          ]);

          if (response.status !== 200) {
            console.error("ERROR while deleting session: ", response);
            res.status(500).json({ msg: `Internal Server Error: ${response}` });
            return;
          }

          res.status(403).statusMessage = "RedirectToLoginPage";
          res.json({
            msg: "Refresh-Token expired. Please log in again",
            redirect: "/login",
          });
        }
      }
    );

    // no procced if
    if (refreshTokenExpired) return;

    // generating new refresh + access tokens
    const newAccessToken = jwt.sign(
      {
        userId: session["userId"],
        sessionId: session["sessionId"],
      },
      process.env.ACCESS_TOKEN_SECRET_KEY!,
      { expiresIn: "15m" }
    );
    const newRefreshToken = jwt.sign(
      { userId: session["userId"] },
      process.env.REFRESH_TOKEN_SECRET_KEY!,
      { expiresIn: "1d" }
    );

    const updateToken = await query(UPDATE_SESSION_REFRESHTOKEN, [
      session["sessionId"],
      newRefreshToken,
    ]);
    if (updateToken["status"] !== 200) throw updateToken;

    res.cookie("refreshToken", newRefreshToken, cookieParams);
    res.setHeader("authorization", "Bearer " + newAccessToken);
    res.status(200).json({
      userId: session["userId"],
      sessionId: session["sessionId"],
    });
  } catch (error) {
    console.error("ERROR in RefreshToken Verification: ", error);
    res.status(500).json({ msg: `Internal Server Error: ${error}` });
  }
};

export default verifyRefreshToken;
