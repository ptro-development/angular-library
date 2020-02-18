'use strict';

// Register `bookList` component, along with its associated controller and template
angular.
  module('bookList').
  component('bookList', {
    templateUrl: 'book-list/book-list.template.html',
    controller: ['PictureSummary',
      function BookListController(PictureSummary) {
        this.summaries = PictureSummary.queryWithFrontCoverUrl();
      }]
  });
