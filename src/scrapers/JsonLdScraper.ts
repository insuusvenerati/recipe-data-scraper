import logger from "../utils/logger";
import Scraper from "./Scraper";

class JsonLdScraper extends Scraper {
  chtml: any;
  meta: any;
  recipeItem: any;
  type: any;
  constructor(chtml: any) {
    super(chtml);
    this.type = "jsonld";
  }

  // @ts-expect-error TS(2425): Class 'Scraper' defines instance member property '... Remove this comment to see the full error message
  testForMetadata() {
    const json: any = [];
    const jsonLdFromHtml = this.chtml('script[type="application/ld+json"]');

    Object.entries(jsonLdFromHtml).forEach(([, item]) => {
    let contents;
    try {
        if (item && (item as any).children && (item as any).children[0] && (item as any).children[0].data) {
            contents = JSON.parse((item as any).children[0].data);
        }
    }
    catch (e) {
        logger("JsonLd: error parsing the json data", e);
        // Fail silently, in case there are valid tags
        return;
    }
    if (contents) {
        json.push(contents);
    }
});

    if (json.length === 0) {
      logger("Error: No JSON-LD valid script tags present on page");
      return;
    }

    this.meta = json.length > 1 ? json : json[0];
  }

  // @ts-expect-error TS(2425): Class 'Scraper' defines instance member property '... Remove this comment to see the full error message
  findRecipeItem() {
    if (this.meta["@type"] === "Recipe") {
      // nytimes, food.com, bonappetite, ohsheglows, simplyrecipes
      this.recipeItem = this.meta;
      return;
    }
    // @graph: king arthur, 12tomatoes, sallysbaking, cookie&kate
    // other: martha stewart, foodnetwork, eatingwell, allrecipes, myrecipes, seriouseats, skinnytaste
    const graphLevel = this.meta["@graph"] || this.meta;
    this.recipeItem = Object.values(graphLevel).find((item) => (item as any)["@type"] === "Recipe");
  }
}

export default JsonLdScraper;
