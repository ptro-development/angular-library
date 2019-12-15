'use strict';

describe('libraryApp', function() {

    var $httpBackend, ctrl, apiUrl;

    beforeEach(module('libraryApp'));

    describe('BookList', function() {
        var $httpBackend, ctrl;
        var responseData = [
            {
                "id": 9,
                "authorId": 1,
                "publisherId": 1,
                "title": "some title one",
                "isbn10": null,
                "isbn13": "1234567890123"
            },
            {
                "id": 5,
                "authorId": 1,
                "publisherId": 1,
                "title": "some title two",
                "isbn10": "1234567890",
                "isbn13": null
            }];

		beforeEach(inject(function($componentController, _$httpBackend_, Config) {
			$httpBackend = _$httpBackend_;
			$httpBackend.expectGET(Config.CONFIG.API_URL + '/books').respond(responseData);
			ctrl = $componentController('bookList');
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('should fetch the author details', function() {
		  $httpBackend.flush();
		  expect(JSON.stringify(ctrl.books)).toEqual(JSON.stringify(responseData));
		});

    });
});
