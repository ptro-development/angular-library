'use strict';

angular.
  module('core.author').
  factory('Author', ['$resource', 'Config',
    function($resource, Config) {
      return $resource(Config.CONFIG.API_URL + '/authors/:id', {id: '@id'}, {
        query: {
          method: 'GET',
          isArray: true
        }
      });
    }
  ]);
