'use strict';

describe('Library Application', function() {

  describe('View: Author details', function() {

    beforeEach(function() {
      browser.get('#!/authors/1');
    });

    it('should display the author`s details', function() {
      expect(element(by.binding('$ctrl.author.firstName')).getText()).toBe('Pavel Dvořák');
      expect(element(by.binding('$ctrl.author.about')).getText()).toContain('Pavel Dvořák');
    });

  });

});
