const fs = require("fs-extra");

async function read() {
  try {
    const filePath = "data/keywords.txt";
    const keywords = new Set();

    // Create file if it is not present
    await fs.ensureFile(filePath);

    const fileData = fs.readFileSync(filePath, "UTF-8");
    const lines = fileData.split(/\r?\n/);
    lines.forEach((line) => {
      if (line) keywords.add(line.trim());
    });
    return keywords;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  read,
};
