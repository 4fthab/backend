import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  fname: { type: String, require: true },
  lname: { type: String },
  mobile: { type: String },
  email: { type: String, require: true, unique: true },
  gender: { type: String },
  age: { type: Number },
  address: {
    type: {
      location: String,
      landmark: String,
      pin: Number,
      state: String,
      country: String,
    },
  },
  createdIN: { type: Date, default: Date.now() },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
