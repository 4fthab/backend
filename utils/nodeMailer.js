import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "afthabditto@gmail.com",
    pass: "qqnz ikei cvvs pxvc",
  },
});
