'use strict';

angular.
  module('publisherDetail').
  component('publisherDetail', {
    templateUrl: 'publisher-detail/publisher-detail.template.html',
    controller: ['$routeParams', 'Publisher',
      function PublisherDetailController($routeParams, Publisher) {
        this.publisher = Publisher.get({id: $routeParams.id});
      }
    ]
  });
