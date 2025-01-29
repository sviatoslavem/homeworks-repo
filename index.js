import Logger from "./logger/logger.js";
import dotenv from "dotenv";
import PermissionException from "./exceptions/PermissionsException.js";

dotenv.config();

// const logger = new Logger();
// const testErr = new PermissionException("Test PermissionException error!");
// const Err = new Error("Test system error!");
// logger.info("Info message");
// logger.warning("Warning message");
// logger.error("Error message");

// logger.error(testErr);
// logger.warning(testErr);
// logger.error(Err);

async function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

console.log("Початок виконання");
await sleep(10_000).then(() => {
  console.log("Дякуємо за очікування!");
});

console.log("Кінець");
