const puppeteer = require("puppeteer");
const baseQuery = "https://www.amazon.it/s?k=";

async function scrapeAsins(keywords) {
  try {
    const asins = new Set();
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    for (const keyword of keywords) {
      console.info(`Loading page for keyword: ${keyword}`);
      await page.goto(baseQuery + keyword.replace(" ", "+"));
      await page.waitForSelector(".a-link-normal.a-text-normal", { timeout: 5000 });
      const scrapedAsins = await page.$$eval("[data-asin]", (elements) => elements.map((div) => div.getAttribute("data-asin")));

      // Add scraped asins to asin set
      scrapedAsins.forEach((scrapedAsin) => {
        if (scrapedAsin) {
          asins.add(scrapedAsin);
        }
      });
    }

    console.info(`Asins found: ${asins.size}`);
    browser.close();
    return asins;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  scrapeAsins,
};
