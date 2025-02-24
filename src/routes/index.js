import { Router } from "express";
import {
  getItems,
  createItem,
  updateItemStatus,
  deleteItem,
} from "../controllers/items.controller.js";
import { logRequest } from "../middleware/itemsLogs.js";
import {
  createItemSchema,
  updateStatusSchema,
  idParamSchema,
  validate,
} from "../validators/items.validator.js";

export const router = Router();
const PATH = "/items";

router.get(PATH, logRequest, getItems);
router.post(PATH, logRequest, validate(createItemSchema), createItem);
router.put(
  `${PATH}/:itemId`,
  logRequest,
  validate(idParamSchema, "params"),
  validate(updateStatusSchema),
  updateItemStatus
);
router.delete(
  `${PATH}/:itemId`,
  logRequest,
  validate(idParamSchema, "params"),
  deleteItem
);
