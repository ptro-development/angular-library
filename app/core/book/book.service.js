'use strict';

angular.
    module('core.book').
    factory('Book', ['$resource', '$q', 'Config', 'Picture',
        function($resource, $q, Config, Picture) {
            let resource = $resource(Config.CONFIG.API_URL + '/books/:id', {id: '@id'}, {
                query: {
                  method: 'GET',
                  url: Config.CONFIG.API_URL + '/books',
                  isArray: true
                },
                getAuthor: {
                  method: 'GET',
                  url: Config.CONFIG.API_URL + '/books/:id/author'
                },
                getPublisher: {
                  method: 'GET',
                  url: Config.CONFIG.API_URL + '/books/:id/publisher'
                },
                getPictures: {
                  method: 'GET',
                  url: Config.CONFIG.API_URL + '/books/:id/pictures',
                  isArray: true
                }
            });

            resource.queryWithFrontCoverUrl = function queryWithFrontCoverUrl() {
                let map_bookId_to_fetchedOrder = {};
                let resource_instance = resource.query();
                resource_instance.$promise.then(function(books) {
                    for (let j = 0; j < books.length; j++) {
                        map_bookId_to_fetchedOrder[books[j].id] = j;
                        resource.getPictures({id: books[j].id}).$promise.then(function(pictures) {
                            for (let i = 0; i < pictures.length; i++) {
                                if (pictures[i].pictureType === 'FRONT_COVER') {
                                    let book_index = pictures[i].bookId.toString();
                                    resource_instance[map_bookId_to_fetchedOrder[book_index]]["frontCoverUrl"] = Config.CONFIG.API_URL + "/pictures/" + pictures[i].id + "/data";
                                    break;
                                }
                            }
                        });
                    }
                });
                return resource_instance;
            };

            return resource;
        }
  ]);


