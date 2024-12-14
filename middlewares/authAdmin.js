import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userFinalModel from "../models/userFinalModel.js";

dotenv.config();

const authAdmin = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;

    if (token && isCustomAuth) {
      const secret = process.env.JWT_SECRET;
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
      const user = await userFinalModel.findById(req.userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.isAdmin = user.isAdmin;
      if (!user.isAdmin) {
        return res.status(403).json({ message: "Access denied: Admins only" });
      }
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ message: "Authentication failed" });
  }
};

export default authAdmin;
