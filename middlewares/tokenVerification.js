import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
  
    const token = req.cookies.auth_token;
    const { userId } = jwt.verify(token, process.env.jwt_secret);
    req.userId = userId;
    next();
  } catch (error) {
    res.status(400).send({ error: "Invalid Token", errMsg: error.message });
  }
};
