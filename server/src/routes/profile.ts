import express from "express";
import updateUsername from "../controllers/profile/updateUsername";
import updatePassword from "../controllers/profile/updatePassword";
import updateBankAccount from "../controllers/profile/updateBankAccount";
import updateProfile from "../controllers/profile/updateProfile";
const router = express.Router();

router.post("/user", updateProfile);
router.put("/user/username", updateUsername);
router.put("/user/password", updatePassword);
router.put("/user/bankAccount", updateBankAccount);

export default router;
