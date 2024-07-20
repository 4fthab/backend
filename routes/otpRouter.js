import express from "express";
import { otpGenerate, otpVerify } from "../controllers/otpController.js";
import { verifyToken } from "../middlewares/tokenVerification.js";

export const otpRouter = express.Router();

// Routing

otpRouter.get("/", (req, res) => {
  res.send("all gud");
});

otpRouter.get("/generate", verifyToken, otpGenerate);
otpRouter.get("/verify", verifyToken, otpVerify);
