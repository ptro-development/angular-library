'use strict';

// Register `bookDetail` component, along with its associated controller and template
angular.
  module('bookDetail').
  component('bookDetail', {
    templateUrl: 'book-detail/book-detail.template.html',
    controller: ['$routeParams', 'Book', 'Config', 'PictureSummary',
      function BookDetailController($routeParams, Book, Config, PictureSummary) {
        let self = this;
        Book.get({id: $routeParams.id}).$promise.then(function(book) {
            self.book = book;
            if (typeof self.book.isbn10 === 'string' && self.book.isbn10 !== "") {
                self.isbn = self.book.isbn10;
            } else if (typeof self.book.isbn13 === 'string' && self.book.isbn13 !== "") {
                self.isbn = self.book.isbn13;
            } else {
                self.isbn = "None";
            }
            self.author = Book.getAuthor({id: $routeParams.id});
            self.publisher = Book.getPublisher({id: $routeParams.id});

            PictureSummary.getBookFrontCovers({bookId: book.id}).$promise.then(function(summary) {
              self.frontCoverSrc = Config.CONFIG.API_URL + "/picturesSummaries/" + summary[0].id + "/picture";
            });

            if (self.frontCoverSrc == undefined ) {
                self.frontCoverSrc = "None";
            }
        });
      }
    ]
  });
