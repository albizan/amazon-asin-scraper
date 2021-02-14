const puppeteer = require("puppeteer");
const baseQuery = "https://www.amazon.it/s?k=";

async function scrapeAsins(keywords, limit = 5) {
  try {
    const asins = new Set();
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    for (const keyword of keywords) {
      let asinAmount = 0;
      await page.goto(baseQuery + keyword.replace(" ", "+"));
      await page.waitForSelector(".a-link-normal.a-text-normal", { timeout: 5000 });
      const scrapedAsins = await page.$$eval("[data-asin]", (elements) => elements.map((div) => div.getAttribute("data-asin")));
      if (scrapedAsins.length > limit) {
        scrapedAsins.length = limit;
      }
      // Add scraped asins to asin set
      scrapedAsins.forEach((scrapedAsin) => {
        if (scrapedAsin.length === 10 && scrapedAsin.charAt(0) === "B") {
          asins.add(scrapedAsin);
          asinAmount++;
        }
      });

      console.info(`Scraped page for keyword: ${keyword}. Found ${asinAmount} asins`);
    }

    console.info(`Distinct asins found: ${asins.size}`);
    browser.close();
    return asins;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  scrapeAsins,
};
