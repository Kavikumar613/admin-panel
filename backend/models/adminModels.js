import mongoose, { Types } from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = mongoose.Schema({
  f_sno: {
    type: Number,
    required: true,
    unique: true,
  },
  f_userName: {
    type: String,
    required: true,
    unique: true,
  },
  f_Pwd: {
    type: String,
    required: true,
  },
});

// Define a static method on the schema to compare passwords
adminSchema.statics.comparePassword = async (
  candidatePassword,
  userPassword
) => {
  return bcrypt.compare(candidatePassword, userPassword);
};

export const Admin = mongoose.model("t_loginFor", adminSchema);
