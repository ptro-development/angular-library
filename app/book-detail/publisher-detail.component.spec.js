'use strict';

describe('libraryApp', function() {

    var $httpBackend, ctrl, apiUrl;

    beforeEach(module('libraryApp'));

    describe('PublisherDetail', function() {
        var $httpBackend, ctrl;
        var responseData = {
            "id": 1,
            "name": "some name",
            "address": "some address",
            "webAddress": "some web address"
        }

		beforeEach(inject(function($componentController, _$httpBackend_, $routeParams, Config) {
			$httpBackend = _$httpBackend_;
			$httpBackend.expectGET(Config.CONFIG.API_URL + '/publishers/1').respond(responseData);
			$routeParams.id = '1';
			ctrl = $componentController('publisherDetail');
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('should fetch the publisher details', function() {
		  jasmine.addCustomEqualityTester(angular.equals);
		  expect(ctrl.publisher).toEqual({});
		  $httpBackend.flush();
		  expect(JSON.stringify(ctrl.publisher)).toEqual(JSON.stringify(responseData));
		});

    });
});
