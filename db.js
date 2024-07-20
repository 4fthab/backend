import mongoose from "mongoose";
import { config } from "dotenv";

config();

const url = process.env.mongoose_url;

export const dbConnect = async () => {
  try {
    await mongoose.connect(url);
    console.log("Database connected succesfully");
  } catch (error) {
    console.log("Database not connected" + error.message);
  }
};
