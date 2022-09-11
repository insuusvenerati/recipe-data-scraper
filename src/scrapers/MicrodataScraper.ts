// @ts-expect-error TS(7016): Could not find a declaration file for module 'micr... Remove this comment to see the full error message
import microdata from "microdata-node";
import Scraper from "./Scraper";

class MicrodataScraper extends Scraper {
  chtml: any;
  meta: any;
  recipeItem: any;
  type: any;
  constructor(chtml: any) {
    super(chtml);
    this.type = "microdata";
  }

  // @ts-expect-error TS(2425): Class 'Scraper' defines instance member property '... Remove this comment to see the full error message
  testForMetadata() {
    const meta = microdata.toJson(this.chtml.html());
    if (!meta || !meta.items || !meta.items[0]) {
      return;
    }
    this.meta = meta;
  }

  // @ts-expect-error TS(2425): Class 'Scraper' defines instance member property '... Remove this comment to see the full error message
  findRecipeItem() {
    const recipe = Object.values(this.meta.items).find((item) => (item as any).type[0].indexOf("Recipe") > -1);
    this.recipeItem = recipe ? (recipe as any).properties : null;
  }
}

export default MicrodataScraper;
