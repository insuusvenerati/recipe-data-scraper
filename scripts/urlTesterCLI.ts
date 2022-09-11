import { question } from 'readline-sync';
import recipeDataScraper from '../src/main';
/*
  This script takes a url from the user and prints the parsed data
  so that a user can test the functionality without a UI
*/
async function recipeUrlTester() {
  console.log(' - - - - - - - - - - - - - - - - -');
  console.log('Welcome to the Recipe Url tester!')
  const answer = question(`Enter Recipe Url: `);

  if (!answer) {
    console.log('Quitting! Come back when you\'re ready!');
    // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
    process.exit(1);
  }

  console.log(`Looking for Recipe Data...`);

  try {
    const data = await recipeDataScraper(answer);

    console.log('The Recipe data you requested!');
    console.log(data);
  } catch (error) {
    console.log('Something went wrong, maybe try a different url');
  }

  const again = question(`Would you like to test another url? (y/n): `);

  if (again === 'y') {
    recipeUrlTester();
  } else {
    console.log('Quitting! Come back soon!');
    // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
    process.exit(1);
  }
}

export default recipeUrlTester();
