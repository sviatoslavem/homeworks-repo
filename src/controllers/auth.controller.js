import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  JWT_SECRET,
  JWT_ACCESS_EXPIRATION,
  JWT_REFRESH_EXPIRATION,
} from "../config/keys.js";

let users = [];
let refreshTokens = [];

const generateTokens = (user) => {
  const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRATION,
  });
  const refreshToken = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRATION,
  });
  refreshTokens.push(refreshToken);
  return { accessToken, refreshToken };
};

export const register = (req, res) => {
  const { username, password } = req.body;
  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: "Користувач вже існує" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = { id: users.length + 1, username, password: hashedPassword };
  users.push(user);

  const tokens = generateTokens(user);
  res.json(tokens);
};

export const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Невірний логін або пароль" });
  }

  const tokens = generateTokens(user);
  res.json(tokens);
};

export const refreshToken = (req, res) => {
  const { token } = req.body;
  if (!token || !refreshTokens.includes(token)) {
    return res.status(403).json({ message: "Refresh Token недійсний" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Refresh Token недійсний" });

    const newTokens = generateTokens(user);
    refreshTokens = refreshTokens.filter((t) => t !== token);
    refreshTokens.push(newTokens.refreshToken);

    res.json(newTokens);
  });
};
