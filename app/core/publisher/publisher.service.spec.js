'use strict';

describe('libraryApp', function() {

    beforeEach(module('libraryApp'));

    describe('Publisher', function() {
        var Publisher, Config, $httpBackend;
        var responseData = {
            "id": 1,
            "name": "some name",
            "address": "some address",
            "webAddress": "some web address"
        };

        beforeEach(inject(function(_$httpBackend_, _Config_, _Publisher_) {
            Config = _Config_;
            Publisher = _Publisher_;
            $httpBackend = _$httpBackend_;
        }));

        describe('get', function () {
            it('should get publisher with id', inject(function (Publisher) {
                $httpBackend.expectGET(Config.CONFIG.API_URL + '/publishers/1').respond(responseData);
                let result = Publisher.get({'id': 1});
                $httpBackend.flush();
                expect(JSON.stringify(result)).toEqual(JSON.stringify(responseData));
            }));
        });

    });
});
