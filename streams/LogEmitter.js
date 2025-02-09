import { EventEmitter } from "events";
import fs from "fs";
import LogTransformer from "./LogTransformer.js";

class LogEmitter extends EventEmitter {
  constructor(logPath = "logs/app.log") {
    super();

    this.writeStream = fs.createWriteStream(logPath, { flags: "a" });

    this.transformer = new LogTransformer();

    this.pipeStream = this.transformer.pipe(this.writeStream);

    this.on("log", (log) => {
      this.transformer.write(log);
    });
  }

  log(message, type) {
    this.emit("log", { message, type });
  }
}

export default LogEmitter;
