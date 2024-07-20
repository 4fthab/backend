import bcrypt from "bcrypt";
import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

// Sign-UP function------------------------------------------------------
export const userSignup = async (req, res) => {
  try {
    const { username, fname, password, email } = req.body;
    if (!username || !password || !fname || !email) {
      return res.status(400).send({
        error: "Provide all require field",
      });
    } else {
      const isUser = await userModel.findOne({ email });
      if (isUser) {
        console.log(isUser);
        return res.status(400).send({ error: "User already Registerd" });
      } else {
        const user = new userModel({
          ...req.body,
          password: bcrypt.hashSync(password, 10),
        });
        let response = await user.save();
        res.status(201).send(response);
      }
    }
  } catch (error) {
    res.status(500).send({ error: "something went wrong" + error.message });
  }
};

// Login function--------------------------------------------------------
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ error: "Provide all the fields" });
    } else {
      const response = await userModel.findOne({ email });
      if (response) {
        // Bcrypt logic
        let matchPass = bcrypt.compareSync(password, response.password);
        if (matchPass) {
          // jwt logic
          const userId = response._id;
          const token = jwt.sign({ userId }, process.env.jwt_secret, {
            expiresIn: "7d",
          });
          res.cookie("auth_token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
          });
          return res.status(200).send({ message: "Login succesfully" });
        } else {
          return res.status(401).send({ error: "Password not matching!!" });
        }
      } else {
        return res.status(401).send({ error: "User not registerd" });
      }
    }
  } catch (error) {
    res.status(500).send({ error: "Something went wrong   " + error.message });
  }
};

// Getuser---------------------------------------------------------------
export const getUser = async (req, res) => {
  try {
    const { userId } = req;
    const userDetails = await userModel
      .findById(userId)
      .select("-_id -password -__v");
    if (!userDetails) {
      return res.status(403).send({ error: "User is not available" });
    } else return res.status(200).send(userDetails);
  } catch (error) {
    res.status(400).send({ error: "Something went wrong   " + error.message });
  }
};

// Logout-----------------------------------------------------------------
export const userLogout = async (req, res) => {
  try {
    res.clearCookie("auth_token");
    return res.status(200).send({ message: "Logout Successfully" });
  } catch (error) {
    res.status(500).send({ error: "Something went wrong   " + error.message });
  }
};

// Update----------------------------------------------------------------
export const userUpdate = async (req, res) => {
  try {
    const userId = req.userId;
    const data = req.body;
    const newData = await userModel.findByIdAndUpdate(userId, {
      $set: { ...data },
    });
    res.status(200).send({ message: "Details updated", userData: { newData } });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Something went wrong   ", errMsg: error.message });
  }
};

// Delete----------------------------------------------------------------
export const deleteUser = async (req, res) => {
  try {
    const userId = req.userId;
    await userModel.findByIdAndDelete(userId);
    res.clearCookie("auth_token");
    res.status(200).send({ message: "User is Deleted" });
  } catch (error) {
    res.status(500).send({ error: "Something went wrong   " + error.message });
  }
};
