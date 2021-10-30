const chai = require('chai');

const HomePage = require('../pageobjects/home.page');

const buttonClickTest = async (button) => {
  await expect(HomePage.nameDisplayField).toHaveTextContaining('random name');
  await button.click();
  await expect(HomePage.nameDisplayField).not.toHaveTextContaining(
    'random name'
  );
};

describe('Cat Name Generator page', () => {
  it('should have the right title', async () => {
    HomePage.open();
    await browser.pause(500);
    await expect(await browser.getTitle()).toBe('Cat Name Generator');
  });

  it('should give random name when male name button is clicked', async () => {
    HomePage.open();
    buttonClickTest(await HomePage.maleNameButton);
  });

  it('should give random name when female name button is clicked', async () => {
    HomePage.open();
    buttonClickTest(await HomePage.femaleNameButton);
  });

  it('should make the list with results visible, when the text is entered', async () => {
    HomePage.open();
    await expect(await HomePage.searchDroplist).not.toBeDisplayed();
    await HomePage.searchField.setValue('ra');
    await expect(await HomePage.searchDroplist).toBeDisplayed();
  });

  it('should make the list with results visible, when the text is entered', async () => {
    HomePage.open();
    await HomePage.searchField.setValue('do');

    const searchResultItems = await HomePage.searchResults;
    const texts = [];
    for (let searchResult of searchResultItems) {
      texts.push(await searchResult.getText());
    }
    chai.expect(texts).all.match(/^Do/g);
  });

  it('should display selected name from results list', async () => {
    HomePage.open();
    await HomePage.searchField.setValue('a');
    let searchResultItems = await HomePage.searchResults;
    for (let i = 0; i < searchResultItems.length; i++) {
      await HomePage.searchField.setValue('a');
      searchResultItems = await HomePage.searchResults;
      const resultValue = await searchResultItems[i].getText();

      await searchResultItems[i].click();

      await expect(HomePage.nameDisplayField).toHaveTextContaining(resultValue);
    }
  });
});
