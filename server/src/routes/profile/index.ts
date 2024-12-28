import express from "express";
import {
  upsertUser,
  updateUsername,
  updatePassword,
  updateBankAccount,
} from "../../controllers/profile";
const router = express.Router();

router.post("/user", upsertUser);
router.put("/user/username", updateUsername);
router.put("/user/password", updatePassword);
router.put("/user/bankAccount", updateBankAccount);

export default router;
