import express from "express";
const router = express.Router();
import handleRegistration from "../controllers/auth/handleRegistration";

router.post("/registration", handleRegistration);

export default router;
