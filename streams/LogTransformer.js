import { Transform } from "stream";
import chalk from "chalk";
import PermissionException from "../exceptions/PermissionsException.js";

class LogTransformer extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(log, encoding, callback) {
    const timestamp = new Date().toISOString();
    let formattedMsg = log.message;

    if (log.message instanceof Error) {
      formattedMsg = `Stack: ${log.message.stack}`;
    } else if (log.message instanceof PermissionException) {
      formattedMsg = `PermissionException: ${log.message.message}\nStack: ${log.message.stack}`;
    } else if (typeof log.message !== "string") {
      formattedMsg = `INVALID MESSAGE TYPE: ${typeof log.message}`;
    }

    switch (log.type) {
      case "info":
        formattedMsg = chalk.blue(`[${timestamp}] INFO: ${formattedMsg}`);
        break;
      case "warning":
        formattedMsg = chalk.yellow(`[${timestamp}] WARNING: ${formattedMsg}`);
        break;
      case "error":
        formattedMsg = chalk.red(`[${timestamp}] ERROR: ${formattedMsg}`);
        break;
      default:
        formattedMsg = chalk.gray(`[${timestamp}] UNKNOWN: ${formattedMsg}`);
    }

    callback(null, formattedMsg + "\n");
    console.log(formattedMsg);
  }
}

export default LogTransformer;
