'use strict';

describe('Library Application', function() {

  describe('View: Publisher details', function() {

    beforeEach(function() {
      browser.get('#!/publishers/1');
    });

    it('should display the publisher`s details', function() {
      expect(element(by.binding('$ctrl.publisher.name')).getText()).toBe('Rak');
      expect(element(by.binding('$ctrl.publisher.address')).getText()).toContain('Slovensko');
      expect(element(by.binding('$ctrl.publisher.webAddress')).getText()).toContain('http');
    });

  });

});
