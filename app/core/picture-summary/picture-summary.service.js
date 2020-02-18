'use strict';

angular.
  module('core.pictureSummary').
  factory('PictureSummary', ['$resource', 'Config', 'Book',
    function($resource, Config, Book) {

      let resource = $resource(Config.CONFIG.API_URL + '/picturesSummaries/:id', {id: '@id'}, {
        query: {
          method: 'GET',
          url: Config.CONFIG.API_URL + '/picturesSummaries',
          isArray: true
        },
        queryFrontCovers: {
          method: 'GET',
          url: Config.CONFIG.API_URL + '/picturesSummaries?' +
            '_page=0&_perPage=500&' +
            '_filters=%7B%22pictureType%22%3A%22FRONT_COVER%22%2C%22pictureSize%22%3A%22SMALL%22%7D',
          isArray: true
        },
        getBookFrontCovers: {
          method: 'GET',
          url: Config.CONFIG.API_URL + '/picturesSummaries?' +
            '_page=0&_perPage=500&' +
            '_filters=%7B%22pictureType%22%3A%22FRONT_COVER%22%2C%22pictureSize%22%3A%22SMALL%22%2C%22bookId%22%3A' + ':bookId' + '%7D',
          isArray: true
        }
      });

      resource.queryWithFrontCoverUrl = function queryWithFrontCoverUrl() {
        let map_bookId_to_cover = {};
        let front_covers = resource.queryFrontCovers();
        front_covers.$promise.then(function(covers) {
          for (let j = 0; j < covers.length; j++) {
            map_bookId_to_cover[covers[j].bookId] = {
                'cover_order' : j,
                'cover_id' : covers[j].id
            };
            Book.get({id: covers[j].bookId}).$promise.then(function(book) {
              front_covers[map_bookId_to_cover[book.id]['cover_order']]["bookTitle"] = book.title;
              front_covers[map_bookId_to_cover[book.id]['cover_order']]["frontCoverUrl"] = Config.CONFIG.API_URL + "/picturesSummaries/" + map_bookId_to_cover[book.id]['cover_id'] + "/picture";
            });
          }
        });
        return front_covers;
      };

      return resource;

    }
  ]);
