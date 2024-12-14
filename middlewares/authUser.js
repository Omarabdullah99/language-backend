
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
//jh

dotenv.config();

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log('token', token);
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      const secret = process.env.JWT_SECRET; // Missing secret assignment
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id; 
    } 
    next();
  } catch (error) {
    console.log(error);
  }
};

export default authUser;

