'use strict';

describe('libraryApp', function() {

    beforeEach(module('libraryApp'));

    describe('Author', function() {
        var Author, Config, $httpBackend;
        var responseData = {
            "id": 1,
            "firstName": "1stName",
            "middleName": null,
            "lastName": "endName",
            "about": "somethig about"
        }

        /* This is the same as below
        beforeEach(function () {
            angular.mock.inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                mockResource = $injector.get('Author');
                Config = $injector.get('Config');
            })
        });
        */

        beforeEach(inject(function(_$httpBackend_, _Config_, _Author_) {
            Config = _Config_;
            Author = _Author_;
            $httpBackend = _$httpBackend_;
        }));


        describe('get', function () {
            it('should call get with author id', inject(function (Author) {
                $httpBackend.expectGET(Config.CONFIG.API_URL + '/authors/1').respond(responseData);
                let result = Author.get({'id': 1});
                $httpBackend.flush();
                expect(JSON.stringify(result)).toEqual(JSON.stringify(responseData));
            }));
        });

    });
});
