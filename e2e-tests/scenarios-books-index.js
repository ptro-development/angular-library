'use strict';

describe('Library Application', function() {

  it('should redirect `index.html` to `#!/books', function() {
    browser.get('index.html');
    expect(browser.getCurrentUrl()).toContain('#!/books');
  });

  describe('View: Books list', function() {

    beforeEach(function() {
      browser.get('#!/books');
    });

    it('should filter the book list as a user types into the search box', function() {
      var bookList = element.all(by.repeater('book in $ctrl.books'));
      var query = element(by.model('$ctrl.query'));

      expect(bookList.count()).toBeGreaterThan(5);

      query.sendKeys('Stopy');
      expect(bookList.count()).toBeGreaterThan(5);

      query.clear();
      query.sendKeys('Tesla');
      expect(bookList.count()).toBe(1);
    });
  });

});
