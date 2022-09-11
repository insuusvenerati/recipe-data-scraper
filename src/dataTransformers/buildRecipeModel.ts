import consolidateRecipeProperties from "./consolidateRecipeProperties";
import propertyTransformerMap from "./propertyTransformerMap";

const buildRecipeModel = (prospectiveProperties: any) => {
  const recipe = consolidateRecipeProperties(prospectiveProperties);

  // parse and transform the property values
  const transformedRecipe = {};
  Object.entries(recipe).forEach(([key, value]) => {
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const propertyTransformer = propertyTransformerMap[key];
    if (propertyTransformer && value) {
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      transformedRecipe[key] = propertyTransformer(value, key);
    }
  });

  return transformedRecipe;
};

export default buildRecipeModel;
