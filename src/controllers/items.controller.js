let items = [];
let idCounter = 1;

export const getItems = (req, res) => {
  res.json(items);
};

export const createItem = (req, res) => {
  const { text } = req.body;

  const newItem = { id: idCounter++, text, status: "new" };
  items.push(newItem);
  res.status(201).json(newItem);
};

export const updateItemStatus = (req, res) => {
  const { itemId } = req.params;
  const { status } = req.body;

  const item = items.find((i) => i.id == itemId);
  if (!item) {
    return res.status(404).json({ error: "Таск не знайдено" });
  }

  item.status = status;
  res.json(item);
};

export const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const index = items.findIndex((i) => i.id == itemId);

  if (index === -1) {
    return res.status(404).json({ error: "Таск не знайдено" });
  }

  const [deletedItem] = items.splice(index, 1);
  res.json({ message: "Таск видалено", deletedItem });
};
