import crypto from "crypto";
import userModel from "../model/userModel.js";
import { otpModel } from "../model/otpModel.js";
import { transporter } from "../utils/nodeMailer.js";

export const otpGenerate = async (req, res) => {
  try {
    const { userId } = req;
    const user = await userModel.findById(userId);

    if (user) {
      // Generate OTP -----------Create
      const otp = crypto.randomInt(100000, 999999).toString();
      const createdAt = new Date();
      const expireAt = new Date(createdAt.getTime() + 5 * 60 * 1000);

      const mailOption = {
        from: "afthabditto@gmail.com",
        to: user.email,
        subject: "chatApp",
        text: `hello user ,this is the otp ${otp}`,
      };

      let otpData = await otpModel.findOne({ userId });

      // Send new OTP after 30s--------------------------------

      if (otpData) {
        let now = new Date();
        let prevCreatedAt = otpData.createdAt;
        if (now.getTime() - prevCreatedAt.getTime() < 10000) {
          return res.status(400).send({ msg: "Please wait for 10 second " });
        }

        // Send mail with new OTP--------------------------------
        
        await transporter.sendMail(mailOption);

        await otpModel.updateOne(
          { userId },
          {
            $set: {
              otp,
              createdAt,
              expireAt,
            },
          }
        );
        return res.status(200).send({ message: "Otp sent to users email" });
      } else {
        const otpData = new otpModel({
          userId: user._id,
          otp,
          createdAt,
          expireAt,
        });
         transporter.sendMail(mailOption, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        await otpData.save();
        return res.status(200).send({ message: "Otp sent to users email" });
      }
    } else {
      return res.status(400).send({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Something went wrong", err: error.message });
  }
};

// OTP verify
export const otpVerify = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).send({ error: "user not found" });
    } else {
      let userOtpId = user._id;
      const otpData = await otpModel.findOne({ userId: userOtpId });
      const now = new Date();
      if (now > otpData.expireAt) {
        return res.status(400).send({ error: "OTP expired,try again" });
      } else {
        let { userOtp } = req.body;
        if (userOtp === otpData.otp) {
          return res.status(200).send({ message: "OTP verified succesfully" });
        } else {
          return res
            .status(200)
            .send({ error: "OTP is not matching,try again" });
        }
      }
    }
  } catch (error) {
    res.status(500).send({ error: error.message, err: "something went wrong" });
  }
};
// -------------------------------
