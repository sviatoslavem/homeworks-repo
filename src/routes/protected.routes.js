import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/dashboard", authenticateToken, (req, res) => {
  res.json({ message: `Вітаємо, ${req.user.id}! Ви отримали доступ.` });
});

export default router;
