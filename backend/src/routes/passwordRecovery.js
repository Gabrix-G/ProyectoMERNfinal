import express from "express";
 import passwordRecoveryControler from "../controllers/passwordRecoveryController.js";
const router = express.Router();
 
router.route("/requestCode").post(passwordRecoveryControler.requestCode);
router.route("/verifyCode").post(passwordRecoveryControler.verifyCode);
router.route("/newPassword").post();

export default router;
 
