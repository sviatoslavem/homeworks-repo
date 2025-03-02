import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/keys.js";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Необхідна авторизація" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Токен недійсний" });
    req.user = user;
    next();
  });
};
