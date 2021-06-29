import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { signInValidate } from "../util/JoiValidation/userValidation";

dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body;
  const { error } = signInValidate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: "failed", error: error.details[0].message });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      const matchedPassword = await bcrypt.compare(password, user.password);
      if (matchedPassword) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "2d",
        });
        const userDetails = {
          id: user._id,
          email: user.email,
          username: user.username,
        };
        return res.status(200).json({
          status: "success",
          token,
          user: userDetails,
        });
      } else {
        return res.status(400).json({
          status: "failed",
          error: "Incorrect Email or Password",
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
