import PermissionException from "./exceptions/PermissionsException.js";
import LogEmitter from "./streams/LogEmitter.js";

const logger = new LogEmitter();

logger.log("This is an informational message.", "info");
logger.log("This is a warning message.", "warning");
logger.log("This is an error message.", "error");

logger.log(new Error("Щось пішло не так"), "error");
logger.log(new PermissionException("Доступ заборонено"), "error");
logger.log(42, "info");

// const logger = new Logger();

// const errorMsg = new Error("This is a system error");
// const permissionMsg = new PermissionException("Permission denied");

// logger.info("This is an informational message.");

// logger.warning("This is a warning message.");
// console.log("1");
// logger.error("This is a error message.");

// setTimeout(() => {
//   console.log("Checking async operation...");
// }, 2_000);

// console.log("2");
// logger.error(errorMsg);
// console.log("3");
// logger.error(permissionMsg);

// const logger = new Logger();
// const testErr = new PermissionException("Test PermissionException error!");
// const Err = new Error("Test system error!");
// logger.info("Info message");
// logger.warning("Warning message");
// logger.error("Error message");

// logger.error(testErr);
// logger.warning(testErr);
// logger.error(Err);

// async function sleep(ms) {
//   return new Promise((res) => setTimeout(res, ms));
// }

// console.log("Початок виконання");
// await sleep(10_000).then(() => {
//   console.log("Дякуємо за очікування!");
// });

// console.log("Кінець");
