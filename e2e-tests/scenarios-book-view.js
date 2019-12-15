'use strict';

describe('Library Application', function() {

  describe('View: Book detail', function() {

    beforeEach(function() {
      browser.get('#!/books/1');
    });

    it('should display the book`s details', function() {
      expect(element(by.binding('$ctrl.book.title')).getText()).toBe('Stopy dávnej minulosti 1 (Slovensko v praveku)');
      expect(element(by.linkText('Pavel Dvořák')).getTagName()).toBe('a');
      expect(element(by.linkText('Rak')).getTagName()).toBe('a');
      expect(element(by.binding('$ctrl.isbn')).getText()).toBe('8085501228');
    });

    it('should jump on author details', function() {
      var author = element(by.linkText('Pavel Dvořák'));
      author.click();
      expect(browser.getCurrentUrl()).toContain('#!/authors/1');
    });

    it('should jump on publisher details', function() {
      var author = element(by.linkText('Rak'));
      author.click();
      expect(browser.getCurrentUrl()).toContain('#!/publishers/1');
    });

  });

});
