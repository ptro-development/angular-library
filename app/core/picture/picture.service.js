'use strict';

angular.
  module('core.picture').
  factory('Picture', ['$resource', 'Config',
    function($resource, Config) {
      return $resource(Config.CONFIG.API_URL + '/pictures/:id', {id: '@id'}, {});
    }
  ]);
