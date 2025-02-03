import fs from "node:fs";
import path from "node:path";
import { appendToFile } from "./fileWriter.js";
import EventEmitter from "../emitter.js";
import levels from "./levels.js";
import formatMessage from "./formatter.js";

export const EVENT_LOGINFO = "logInfo";
export const EVENT_LOGWARNING = "logWarning";
export const EVENT_LOGERROR = "logError";

const emitter = new EventEmitter();

class Logger {
  constructor(logPath = "logs/app.log") {
    this.logPath = logPath;

    if (!fs.existsSync(path.dirname(this.logPath))) {
      fs.mkdirSync(path.dirname(this.logPath), { recursive: true });
    }

    emitter.on(EVENT_LOGINFO, this.logInfo.bind(this));
    emitter.on(EVENT_LOGWARNING, this.logWarning.bind(this));
    emitter.on(EVENT_LOGERROR, this.logError.bind(this));
  }

  async logInfo(msg) {
    const formattedMsg = formatMessage(levels.INFO, msg);
    await appendToFile(this.logPath, formattedMsg);
    console.log("logInfo triggered");
  }

  async logWarning(msg) {
    const formattedMsg = formatMessage(levels.WARNING, msg);
    await appendToFile(this.logPath, formattedMsg);
    console.log("logWarning triggered");
  }

  async logError(msg) {
    const formattedMsg = formatMessage(levels.ERROR, msg);
    await appendToFile(this.logPath, formattedMsg);
    console.log("logError triggered");
  }

  info(msg) {
    emitter.emit(EVENT_LOGINFO, msg);
  }

  warning(msg) {
    emitter.emit(EVENT_LOGWARNING, msg);
  }

  error(msg) {
    emitter.emit(EVENT_LOGERROR, msg);
  }
}

export default Logger;
