import express from "express";
const router = express.Router();
import handleRegistration from "../controllers/auth/handleRegistration";
import handleLogin from "../controllers/auth/handleLogin";
import handleLogout from "../controllers/auth/handleLogout";
import verifyRefreshToken from "../controllers/auth/verifyRefreshToken";

router.post("/registration", handleRegistration);
router.post("/login", handleLogin);
router.get("/logout", handleLogout);
router.get("/refresh-token", verifyRefreshToken);

export default router;
