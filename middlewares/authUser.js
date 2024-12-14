import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authUser = async (req, res, next) => {
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
    } 

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ message:error });
  }
};

export default authUser;




// const auth = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const isCustomAuth = token.length < 500;
//     let decodedData;

//     if (token && isCustomAuth) {
//       decodedData = jwt.verify(token, secret);
//       req.userId = decodedData?.id; 
      
//       // isAdmin ফিল্ড JWT টোকেন থেকে বা ডাটাবেস থেকে সেট করুন
//       const user = await UserModel.findById(req.userId);
//       req.isAdmin = user?.isAdmin; // isAdmin ডাটাবেস থেকে নিয়ে সেট করা
//     } 

//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Authentication failed" });
//   }
// };

// export default auth;

