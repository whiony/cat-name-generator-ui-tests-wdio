class HomePage {
  get mainHeading() {
    return $('.title');
  }

  get nameDisplayField() {
    return $('.result');
  }

  get maleNameButton() {
    return $('.name=male name').parentElement();
  }

  get femaleNameButton() {
    return $('.name=female name').parentElement();
  }

  get searchField() {
    return $("input[type='search']");
  }

  get searchDroplist() {
    return $('.search__droplist');
  }

  get searchResults() {
    return $$('.search__result');
  }

  open() {
    browser.url('https://whiony.github.io/cat-name-generator');
  }
}

module.exports = new HomePage();
