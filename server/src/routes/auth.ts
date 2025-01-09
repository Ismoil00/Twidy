import express from "express";
const router = express.Router();
import handleRegistration from "../controllers/auth/handleRegistration";
import handleLogin from "../controllers/auth/handleLogin";

router.post("/registration", handleRegistration);
router.post("/login", handleLogin);

export default router;
