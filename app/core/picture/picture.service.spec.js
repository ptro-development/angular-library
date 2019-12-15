'use strict';

describe('libraryApp', function() {

    beforeEach(module('libraryApp'));

    describe('Picture', function() {
        var Picture, Config, $httpBackend;
        var responseData = {
            "id": 90,
            "name": "cov1.jpg",
            "pictureType": "FRONT_COVER",
            "mimetype": "image/jpeg",
            "bookId": 1
        };

        beforeEach(inject(function(_$httpBackend_, _Config_, _Picture_) {
            Config = _Config_;
            Picture = _Picture_;
            $httpBackend = _$httpBackend_;
        }));

        describe('get', function () {
            it('should get picture with id', inject(function (Picture) {
                $httpBackend.expectGET(Config.CONFIG.API_URL + '/pictures/90').respond(responseData);
                let result = Picture.get({'id': 90});
                $httpBackend.flush();
                expect(JSON.stringify(result)).toEqual(JSON.stringify(responseData));
            }));
        });

    });
});
