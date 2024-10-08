import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./db.js";
import userRouter from "./routes/userRouter.js";
import { otpRouter } from "./routes/otpRouter.js";
import msgRouter from "./routes/messageRouter.js";
import cookieParser from "cookie-parser";

const app = express();

// Middleware-------------------------
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
config();

// Routers----------------------------
app.use("/user", userRouter);
app.use("/otp", otpRouter);
app.use("/msg", msgRouter);

// PORT and Host----------------------
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on http://${PORT}`);
  dbConnect();
});
