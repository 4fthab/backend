import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const { auth_token } = req.cookies;
    if (!auth_token) {
      return res.status(401).send({ error: "No token provided" });
    }
    const { userId } = jwt.verify(auth_token, process.env.jwt_secret);
    req.userId = userId;
    next();
  } catch (error) {
    res.status(400).send({ error: "Invalid Token", errMsg: error.message });
  }
};
