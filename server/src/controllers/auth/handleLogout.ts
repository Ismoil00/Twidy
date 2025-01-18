import { Request, Response } from "express";
import { cookieParamsWithoutAge } from "../../helpers/constants";
import { query } from "../../configs/db";
import { DEELTE_SESSION_VIA_REFRESHTOKEN } from "../../helpers/queries";

const handleLogout = async (req: Request, res: Response) => {
  try {
    const refreshToken: string = req.cookies["refreshToken"];
    
    const sessionDeleted = await query(DEELTE_SESSION_VIA_REFRESHTOKEN, [
      refreshToken,
    ]);
    if (sessionDeleted.status !== 200) throw sessionDeleted;

    res.clearCookie("refreshToken", cookieParamsWithoutAge);
    res.sendStatus(204);
  } catch (error) {
    console.error("ERROR in Logout: ", error);
    res.status(500).json({ msg: `Internal Server Error: ${error}` });
  }
};

export default handleLogout;
