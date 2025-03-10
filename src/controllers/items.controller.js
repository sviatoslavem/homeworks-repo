import Item from "../models/item.model.js";

export const getItems = async (req, res) => {
  const items = await Item.findAll();
  res.json(items);
};

export const createItem = async (req, res) => {
  const { text } = req.body;
  try {
    const newItem = await Item.create({ text });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: "Помилка створення таски" });
  }
};

export const updateItemStatus = async (req, res) => {
  const { itemId } = req.params;
  const { status } = req.body;

  try {
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ error: "Таск не знайдено" });
    }

    item.status = status;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Помилка оновлення таски" });
  }
};

export const deleteItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ error: "Таск не знайдено" });
    }

    await item.destroy();
    res.json({ message: "Таск видалено" });
  } catch (err) {
    res.status(500).json({ error: "Помилка видалення таски" });
  }
};
