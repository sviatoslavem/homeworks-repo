import fs from "node:fs";

export async function appendToFile(filePath, data) {
  try {
    await fs.promises.appendFile(filePath, `${data} \n`);
  } catch (err) {
    console.error("Error while appending data to file", err.message);
  }
}
