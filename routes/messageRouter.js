import express from "express";
import { getMessage, sendMessage } from "../controllers/messageController.js";
import { verifyToken } from "../middlewares/tokenVerification.js";

const msgRouter = express.Router();

// demo---------------------------------------
msgRouter.get("/", (req, res) => {
  res.send("msg Router working");
});

// send message API-----------------------
msgRouter.post("/send/:receiverId", verifyToken, sendMessage);

// get message API
msgRouter.get("/get/:receiverId", verifyToken, getMessage);

export default msgRouter;
