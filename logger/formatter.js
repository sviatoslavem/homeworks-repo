import chalk from "chalk";
import PermissionException from "../exceptions/PermissionsException.js"; // Імпортуємо PermissionException

function formatMessage(level, msg) {
  const timestamp = new Date().toISOString();
  let formattedMsg;

  if (msg instanceof Error) {
    formattedMsg = `System: ${msg.message}\nStack: ${msg.stack}`;
  } else if (msg instanceof PermissionException) {
    formattedMsg = `PermissionException: ${msg.message}\nStack: ${msg.stack}`;
  } else {
    formattedMsg = msg;
  }

  switch (level) {
    case "info":
      return chalk.blue(`[${timestamp}], INFO: ${formattedMsg}`);
    case "warning":
      return chalk.yellow(`[${timestamp}], WARNING: ${formattedMsg}`);
    case "error":
      return chalk.red(`[${timestamp}], ERROR: ${formattedMsg}`);
    default:
      return chalk.gray(`[${timestamp}], UNKNOWN: ${formattedMsg}`);
  }
}

export default formatMessage;
