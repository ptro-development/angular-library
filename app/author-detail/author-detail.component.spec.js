'use strict';

describe('libraryApp', function() {

    var $httpBackend, ctrl, apiUrl;

    beforeEach(module('libraryApp'));

    describe('AuthorDetail', function() {
        var $httpBackend, ctrl;
        var responseData = {
            "id": 1,
            "firstName": "1stName",
            "middleName": null,
            "lastName": "endName",
            "about": "somethig about"
        }

		beforeEach(inject(function($componentController, _$httpBackend_, $routeParams, Config) {
			$httpBackend = _$httpBackend_;
			$httpBackend.expectGET(Config.CONFIG.API_URL + '/authors/1').respond(responseData);
			$routeParams.id = '1';
			ctrl = $componentController('authorDetail');
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('should fetch the author details', function() {
		  jasmine.addCustomEqualityTester(angular.equals);
		  expect(ctrl.author).toEqual({});
		  $httpBackend.flush();
		  expect(JSON.stringify(ctrl.author)).toEqual(JSON.stringify(responseData));
		});

    });
});
