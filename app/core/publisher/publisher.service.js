'use strict';

angular.
  module('core.publisher').
  factory('Publisher', ['$resource', 'Config',
    function($resource, Config) {
      return $resource(Config.CONFIG.API_URL + '/publishers/:id', {id: '@id'}, {
        query: {
          method: 'GET',
          isArray: true
        }
      });
    }
  ]);
