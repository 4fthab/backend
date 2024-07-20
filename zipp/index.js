import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./db.js";
import userRouter from "./routes/userRouter.js";

const app = express();

// Middleware-------------------------
app.use(express.json());
app.use(cors());
config();

// Routers----------------------------
app.use("/user", userRouter);

// PORT and Host----------------------
const PORT = process.env.PORT;
const host = process.env.host;

app.listen(PORT, host, () => {
  console.log(`server running on http://${host}:${PORT}`);
  dbConnect();
});
