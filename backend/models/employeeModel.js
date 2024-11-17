import mongoose, { Types } from "mongoose";

const employeeSchema = mongoose.Schema(
  {
    f_Id: {
      type: String,
      required: true,
      unique: true,
    },
    f_Name: {
      type: String,
      required: true,
    },
    f_Email: {
      type: String,
      required: true,
      unique: true,
    },
    f_Mobile: {
      type: Number,
      required: true,
    },
    f_Designation: {
      type: String,
      required: true,
    },
    f_Gender: {
      type: String,
      required: true,
    },
    f_Course: {
      type: [String],
      default: [],
      required: true,
    },
    f_IsActive: {
      type: Boolean,
      required: true,
    },
    f_Image: {
      type: String,
      required: true,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Employee = mongoose.model("t_Employee", employeeSchema);
