const fs = require("fs-extra");

async function write(asins) {
  try {
    const filePath = "data/asins.txt";
    // Genrate a string from the set of asins
    let data = Array.from(asins).reduce((acc, asin) => `${acc}\n${asin}`);

    // Remove the first character because it is a '\n'
    data = data.slice(1);

    // Create file if it is not present
    await fs.ensureFile(filePath);

    fs.writeFileSync(filePath, data);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  write,
};
