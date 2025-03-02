// import { Router } from "express";
// import {
//   getItems,
//   createItem,
//   updateItemStatus,
//   deleteItem,
// } from "../controllers/items.controller.js";
// import { logRequest } from "../middleware/itemsLogs.js";
// import {
//   createItemSchema,
//   updateStatusSchema,
//   idParamSchema,
//   validate,
// } from "../validators/items.validator.js";
// import { authenticateToken } from "../middleware/auth.middleware.js";

// export const router = Router();
// const PATH = "/items";

// router.get(PATH, authenticateToken, logRequest, getItems);
// router.post(
//   PATH,
//   authenticateToken,
//   logRequest,
//   validate(createItemSchema),
//   createItem
// );
// router.put(
//   `${PATH}/:itemId`,
//   authenticateToken,
//   logRequest,
//   validate(idParamSchema, "params"),
//   validate(updateStatusSchema),
//   updateItemStatus
// );
// router.delete(
//   `${PATH}/:itemId`,
//   authenticateToken,
//   logRequest,
//   validate(idParamSchema, "params"),
//   deleteItem
// );
