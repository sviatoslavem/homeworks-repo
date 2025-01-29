import fs from "node:fs";
import path from "node:path";
import levels from "./levels.js";
import formatMessage from "./formatter.js";
import PermissionException from "../exceptions/PermissionsException.js";

class Logger {
  constructor(logPath = "logs/app.log") {
    this.logPath = logPath;

    if (!fs.existsSync(path.dirname(this.logPath))) {
      fs.mkdirSync(path.dirname(this.logPath), { recursive: true });
    }
  }

  __log(level, msg) {
    let formattedMsg;

    if (msg instanceof PermissionException) {
      formattedMsg = formatMessage(
        level,
        `PermissionException: ${msg.message}\nStack: ${msg.stack}`
      );
    } else if (msg instanceof Error) {
      formattedMsg = formatMessage(
        level,
        `System: ${msg.message}\nStack: ${msg.stack}`
      );
    } else {
      formattedMsg = formatMessage(level, msg);
    }

    if (process.env["APP_ENV"] === "local") {
      console.log(formattedMsg);
    } else {
      fs.appendFile(this.logPath, `${formattedMsg} \n`, (err) => {
        if (err) {
          console.error("Error while try to put data to file", err.message);
        }
      });
    }
  }

  info(msg) {
    this.__log(levels.INFO, msg);
  }

  warning(msg) {
    this.__log(levels.WARNING, msg);
  }

  error(msg) {
    this.__log(levels.ERROR, msg);
  }
}

export default Logger;
