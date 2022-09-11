import axios from "axios";
import cheerio from "cheerio";
import MicrodataScraper from "./scrapers/MicrodataScraper";
import JsonLdScraper from "./scrapers/JsonLdScraper";
import logger from "./utils/logger";

const errorMessage = "Could not find recipe data";

export default async (url: any, options = {}) => {
  // @ts-expect-error TS(2339): Property 'printToConsole' does not exist on type '... Remove this comment to see the full error message
  const { printToConsole } = options;

  let chtml;

  try {
    // load html from scraped url
    const resp = await axios(url);
    chtml = cheerio.load(resp.data);
  } catch (error) {
    throw new Error(errorMessage);
  }

  try {
    // attempt to find JsonLd data, return recipe or log and continue
    // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
    const jsonLdScraper = new JsonLdScraper(chtml, url);
    const recipe = jsonLdScraper.getRecipe();

    if (printToConsole) {
      jsonLdScraper.print();
    }

    return {
      ...recipe,
      url,
    };
  } catch (error) {
    logger("main:JsonLdScraper", {
      // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
      ...error,
      url,
    });
  }

  // attempt to find microdata, return recipe or log and continue
  try {
    // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
    const microdataScraper = new MicrodataScraper(chtml, url);
    const recipe = microdataScraper.getRecipe();

    if (printToConsole) {
      microdataScraper.print();
    }

    return {
      ...recipe,
      url,
    };
  } catch (error) {
    logger("main:MicrodataScraper", {
      // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
      ...error,
      url,
    });
  }

  // could add a Scraper for rdfa in the future

  // throw if no recipe found
  throw new Error(errorMessage);
};
