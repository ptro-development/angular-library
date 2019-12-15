'use strict';

describe('libraryApp', function() {

    beforeEach(module('libraryApp'));

    describe('Book', function() {
        var Book, Config, $httpBackend;
        var bookResponseData = {
            "id": 1,
            "authorId": 2,
            "publisherId": 3,
            "title": "some title",
            "isbn10": null,
            "isbn13": null
        };
        var authorResponseData = {
            "id": 1,
            "firstName": "1stName",
            "middleName": null,
            "lastName": "endName",
            "about": "somethig about"
        };
        var publisherResponseData = {
            "id": 1,
            "name": "some name",
            "address": "some address",
            "webAddress": "some web address"
        };
        var picturesResponseData = [{
            "id": 90,
            "name": "cov1.jpg",
            "pictureType": "FRONT_COVER",
            "mimetype": "image/jpeg",
            "bookId": 1
        }];

        beforeEach(inject(function(_$httpBackend_, _Config_, _Book_) {
            Config = _Config_;
            Book = _Book_;
            $httpBackend = _$httpBackend_;
        }));


        describe('get', function () {
            it('should call get with book id', inject(function (Book) {
                $httpBackend.expectGET(Config.CONFIG.API_URL + '/books/1').respond(bookResponseData);
                let result = Book.get({'id': 1});
                $httpBackend.flush();
                expect(JSON.stringify(result)).toEqual(JSON.stringify(bookResponseData));
            }));
        });

        describe('query', function () {
            it('should get all books', inject(function (Book) {
                $httpBackend.expectGET(Config.CONFIG.API_URL + '/books').respond([bookResponseData]);
                let result = Book.query();
                $httpBackend.flush();
                expect(JSON.stringify(result)).toEqual(JSON.stringify([bookResponseData]));
            }));
        });

        describe('getAuthor', function () {
            it('should get book\'s author', inject(function (Book) {
                $httpBackend.expectGET(Config.CONFIG.API_URL + '/books/1/author').respond(authorResponseData);
                let result = Book.getAuthor({'id': 1});
                $httpBackend.flush();
                expect(JSON.stringify(result)).toEqual(JSON.stringify(authorResponseData));
            }));
        });

        describe('getPublisher', function () {
            it('should could get book\'s publisher id', inject(function (Book) {
                $httpBackend.expectGET(Config.CONFIG.API_URL + '/books/1/publisher').respond(publisherResponseData);
                let result = Book.getPublisher({'id': 1});
                $httpBackend.flush();
                expect(JSON.stringify(result)).toEqual(JSON.stringify(publisherResponseData));
            }));
        });

        describe('getPictures', function () {
            it('should call get book\'s pictures', inject(function (Book) {
                $httpBackend.expectGET(Config.CONFIG.API_URL + '/books/1/pictures').respond(picturesResponseData);
                let result = Book.getPictures({'id': 1});
                $httpBackend.flush();
                expect(JSON.stringify(result)).toEqual(JSON.stringify(picturesResponseData));
            }));
        });

    });
});
