import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import { Admin } from "./models/adminModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import { verifyToken } from "./middleware/middleware.js";
import cookieParser from "cookie-parser";
import router from "./routes/adminRoutes.js";
import employeeRoute from "./routes/employeeRoutes.js";

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors());

// config env variable file
dotenv.config();

const port = process.env.PORT;

app.get("/", (req, res) => {
  return res.status(200).send("Welcome Our Page");
});

app.use("/login", router);
app.use("/employee", employeeRoute);

app.get("/dashboard", verifyToken, (req, res) => {
  res.send("Welcome to dashboard");
});

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    console.log("App Connected to database");
    app.listen(port, () => {
      console.log(`Server listing ${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
