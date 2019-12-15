'use strict';

angular.
  module('authorDetail').
  component('authorDetail', {
    templateUrl: 'author-detail/author-detail.template.html',
    controller: ['$routeParams', 'Author',
      function AuthorDetailController($routeParams, Author) {
        this.author = Author.get({id: $routeParams.id});
      }
    ]
  });
