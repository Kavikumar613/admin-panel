import express from "express";
import { Admin } from "../models/adminModels.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// app.post("/register", async (req, res) => {
//   try {
//     const { f_sno, f_userName, f_Pwd } = req.body;

//     if (!f_sno || !f_userName || !f_Pwd) {
//       return res
//         .status(400)
//         .send({
//           message: "Send all required fields : sno, username, password",
//         });
//     }

//     const existingUser = await Admin.findOne({ f_userName });
//     if (existingUser)
//       return res.status(400).send({ message: "Admin already exists" });

//     const hashedPassword = await bcrypt.hash(f_Pwd, 10);
//     // create a new admin
//     const user = new Admin({ f_sno, f_userName, f_Pwd: hashedPassword });
//     res.status(201).send({ message: "Admin Registered successfully" });
//     await user.save();
//   } catch (error) {
//     res.status(500).send({ message: "server error", error });
//     console.log(error);
//   }
// });

router.post("/", async (req, res) => {
  try {
    //request json body
    const { f_userName, f_Pwd } = req.body;
    const error = {};
    // server-side validation
    if (!f_userName) error.username = "Username is required";
    if (!f_Pwd) error.password = "password is required";

    if (Object.keys(error).length > 0) {
      return res.status(400).json({ error });
    }

    // Check for existing username in the database
    const admin = await Admin.findOne({ f_userName });
    if (!admin) {
      return res.status(404).send({ message: "user not found" });
    }

    // compare passwords
    const isMatch = await Admin.comparePassword(f_Pwd, admin.f_Pwd);
    if (!isMatch)
      return res.status(400).send({ message: "Invalid credentials" });

    // Generete JWT token
    const token = jwt.sign(
      { userId: admin._id, username: admin.f_userName },
      process.env.JWT_SECRET,
      {
        expiresIn: "60s",
      }
    );

    // set token in to cookies
    // Set cookie with 60-second expiration
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60000, // 60 seconds in milliseconds
    });

    // return message success log in
    res
      .status(201)
      .json({
        message: "Login successfull",
        authToken: token,
        username: admin.f_userName,
      });
  } catch (e) {
    console.log(e);

    // if error occure return message
    res.status(500).send({ message: "Server error", e });
  }
});

export default router;
