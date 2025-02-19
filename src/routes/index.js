import { Router } from "express";

export const router = Router();

let items = [];
let idCounter = 1;
const PATH = "/items";

const logRequest = (req, action) => {
  console.log(`${PATH} ${action}`, req.rawHeaders[1]);
};

router.get(PATH, (req, res) => {
  logRequest(req, "GET");
  res.json(items);
});

router.post(PATH, (req, res) => {
  logRequest(req, "POST");
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Поле 'text' є обов’язковим" });
  }

  const newItem = { id: idCounter++, text, status: "new" };
  items.push(newItem);
  res.status(201).json(newItem);
});

router.put(`${PATH}/:itemId`, (req, res) => {
  const { itemId } = req.params;
  const { status } = req.body;

  const item = items.find((i) => i.id == itemId);
  if (!item) {
    return res.status(404).json({ error: "Таск не знайдено" });
  }

  if (!["new", "done"].includes(status)) {
    return res
      .status(400)
      .json({ error: "Статус повинен бути 'new' або 'done'" });
  }

  item.status = status;
  res.json(item);
});

router.delete(`${PATH}/:itemId`, (req, res) => {
  logRequest(req, "DELETE");
  const { itemId } = req.params;
  const index = items.findIndex((i) => i.id == itemId);

  if (index === -1) {
    return res.status(404).json({ error: "Таск не знайдено" });
  }

  const [deletedItem] = items.splice(index, 1);
  res.json({ message: "Таск видалено", deletedItem });
});
