import express from "express";
const router = express.Router();
import handleRegistration from "../controllers/auth/handleRegistration";
import handleLogin from "../controllers/auth/handleLogin";
import handleLogout from "../controllers/auth/handleLogout";

router.post("/registration", handleRegistration);
router.post("/login", handleLogin);
router.get("/logout", handleLogout);

export default router;
