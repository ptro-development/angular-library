'use strict';

describe('libraryApp', function() {

    var $httpBackend, ctrl, apiUrl, Config, $componentController;

    beforeEach(module('libraryApp'));

    describe('BookDetail', function() {
        var $httpBackend, ctrl, $routeParams;
        var bookResponseData = {
			"id": 1,
			"authorId": 2,
			"publisherId": 3,
			"title": "some title",
			"isbn10": null,
			"isbn13": null
		}
        var authorResponseData = {
            "id": 1,
            "firstName": "1stName",
            "middleName": null,
            "lastName": "endName",
            "about": "somethig about"
        }
        var publisherResponseData = {
            "id": 1,
            "name": "some name",
            "address": "some address",
            "webAddress": "some web address"
        }
		var picturesResponseData = [{
			"id": 90,
			"name": "cov1.jpg",
			"pictureType": "FRONT_COVER",
			"mimetype": "image/jpeg",
			"bookId": 1
		}]

		beforeEach(inject(function(_$componentController_, _$httpBackend_, _$routeParams_, _Config_) {
			Config = _Config_;
			$httpBackend = _$httpBackend_;
			$routeParams = _$routeParams_;
			$componentController  = _$componentController_;
			$routeParams.id = '1';
	    }));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		function initController() {
			$httpBackend.expectGET(Config.CONFIG.API_URL + '/books/1').respond(bookResponseData);
			$httpBackend.expectGET(Config.CONFIG.API_URL + '/books/author').respond(authorResponseData);
			$httpBackend.expectGET(Config.CONFIG.API_URL + '/books/publisher').respond(publisherResponseData);
			$httpBackend.expectGET(Config.CONFIG.API_URL + '/books/pictures').respond(picturesResponseData);
			ctrl = $componentController('bookDetail');
		    $httpBackend.flush();
		};

		function testDefaultObtainedData() {
		    expect(JSON.stringify(ctrl.book)).toEqual(JSON.stringify(bookResponseData));
		    expect(JSON.stringify(ctrl.author)).toEqual(JSON.stringify(authorResponseData));
		    expect(JSON.stringify(ctrl.publisher)).toEqual(JSON.stringify(publisherResponseData));
		};

		it('should fetch the book details with isbn13', function() {
			bookResponseData.isbn13 = "12345";
			bookResponseData.isbn10 = null;
			initController();
			testDefaultObtainedData();
	    	expect(ctrl.isbn).toEqual(bookResponseData.isbn13);
		    expect(ctrl.frontCoverSrc).toEqual(Config.CONFIG.API_URL + "/pictures/" + picturesResponseData[0].id);
		});

		it('should fetch the book details with isbn10', function() {
			bookResponseData.isbn13 = null;
			bookResponseData.isbn10 = "1234";
			initController();
			testDefaultObtainedData();
		    expect(ctrl.isbn).toEqual(bookResponseData.isbn10);
		    expect(ctrl.frontCoverSrc).toEqual(Config.CONFIG.API_URL + "/pictures/" + picturesResponseData[0].id);
		});

		it('should fetch the book details with no isbn', function() {
			bookResponseData.isbn13 = null;
			bookResponseData.isbn10 = null;
			initController();
			testDefaultObtainedData();
		    expect(ctrl.isbn).toEqual('None');
		    expect(ctrl.frontCoverSrc).toEqual(Config.CONFIG.API_URL + "/pictures/" + picturesResponseData[0].id);
		});

		it('should fetch the book details without any pictures', function() {
			bookResponseData.isbn13 = null;
			bookResponseData.isbn10 = "1234";

			$httpBackend.expectGET(Config.CONFIG.API_URL + '/books/1').respond(bookResponseData);
			$httpBackend.expectGET(Config.CONFIG.API_URL + '/books/author').respond(authorResponseData);
			$httpBackend.expectGET(Config.CONFIG.API_URL + '/books/publisher').respond(publisherResponseData);
			$httpBackend.expectGET(Config.CONFIG.API_URL + '/books/pictures').respond([]);
			ctrl = $componentController('bookDetail');
		    $httpBackend.flush();
			testDefaultObtainedData();
		    expect(ctrl.isbn).toEqual(bookResponseData.isbn10);
		    expect(ctrl.frontCoverSrc).toEqual('None');
		});

        it('should fetch the book details without FRONT_COVER picture', function() {
			bookResponseData.isbn13 = null;
			bookResponseData.isbn10 = "1234";
			let picturesResponse = [{
				"id": 90,
				"name": "cov1.jpg",
				"pictureType": "BACK_COVER",
				"mimetype": "image/jpeg",
				"bookId": 1
			}]

			$httpBackend.expectGET(Config.CONFIG.API_URL + '/books/1').respond(bookResponseData);
			$httpBackend.expectGET(Config.CONFIG.API_URL + '/books/author').respond(authorResponseData);
			$httpBackend.expectGET(Config.CONFIG.API_URL + '/books/publisher').respond(publisherResponseData);
			$httpBackend.expectGET(Config.CONFIG.API_URL + '/books/pictures').respond(picturesResponse);
			ctrl = $componentController('bookDetail');
		    $httpBackend.flush();
			testDefaultObtainedData();
		    expect(ctrl.isbn).toEqual(bookResponseData.isbn10);
		    expect(ctrl.frontCoverSrc).toEqual('None');
		});

    });
});
