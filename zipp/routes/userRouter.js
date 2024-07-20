import express from "express";
import {
  deleteUser,
  getUser,
  userLogin,
  userLogout,
  userSignup,
  userUpdate,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/tokenVerification.js";

const userRouter = express.Router();

// demo-------------------------------
userRouter.get("/", (req, res) => {
  res.send("hi");
});

// signup------------------------------
userRouter.post("/signup", userSignup);

// Login-------------------------------
userRouter.post("/login", userLogin);

// Token verification----------------
userRouter.get("/getuser", verifyToken, getUser);

// Logout------------------------------
userRouter.get("/logout", userLogout);

// Update-----------------------------
userRouter.put("/update", verifyToken, userUpdate);

// Delete----------------------------
userRouter.delete("/delete", verifyToken, deleteUser);
// Exports------------------------
export default userRouter;
