import cloudinary from "cloudinary";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userFinalModel from "../models/userFinalModel.js";

dotenv.config();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

//*register controller
export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  const imageFile = req.file;
  try {
    const oldUser = await userFinalModel.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    //upload image to cloudinary
    const imageUpload = await cloudinary.v2.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const result = await userFinalModel.create({
      email,
      password: hashedPassword,
      name,
      image: imageUrl,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "72h",
      }
    );
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

//*Login
export const signin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password)

  try {
    const oldUser = await userFinalModel.findOne({ email });
    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "72h",
      }
    );

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const testUser = async (req, res) => {
  res.status(200).json({ message: "ok router" });
};
