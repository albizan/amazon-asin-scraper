const { read } = require("./reader");
const { write } = require("./writer");
const { scrapeAsins } = require("./scraper");

async function start() {
  // Read keywords from file
  const keywords = await read();
  if (keywords.size === 0) {
    console.info("The file data/keywords.txt is empty");
    return;
  }
  console.info("Keywords trovate: " + keywords.size);

  // Init scraping operation
  const asins = await scrapeAsins(Array.from(keywords));

  // Write asins to data/asins.txt file
  await write(asins);

  console.info("Done!");
}

start();
