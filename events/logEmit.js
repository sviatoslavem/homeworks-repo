import Logger from "../logger/logger.js";
import PermissionException from "../exceptions/PermissionsException.js";

const logger = new Logger();

const errorMsg = new Error("This is a system error");
const permissionMsg = new PermissionException("Permission denied");

logger.info("This is an informational message.");

logger.warning("This is a warning message.");

logger.error("This is a error message.");

logger.error(errorMsg);

logger.error(permissionMsg);
