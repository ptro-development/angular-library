'use strict';

angular.
  module('libraryApp').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/books', {
          template: '<book-list></book-list>'
        }).
        when('/books/:id', {
            template: '<book-detail></book-detail>'
        }).
        when('/authors/:id', {
          template: '<author-detail></author-detail>'
        }).
        when('/publishers/:id', {
          template: '<publisher-detail></publisher-detail>'
        }).
        otherwise('/books');
    }
  ]);
