'use strict';

// Register `bookDetail` component, along with its associated controller and template
angular.
  module('bookDetail').
  component('bookDetail', {
    templateUrl: 'book-detail/book-detail.template.html',
    controller: ['$routeParams', 'Book', 'Config',
      function BookDetailController($routeParams, Book, Config) {
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
            Book.getPictures({id: $routeParams.id}).$promise.then(function(pictures) {
                for (var i = 0; i < pictures.length; i++) {
                    if (pictures[i].pictureType === 'FRONT_COVER') {
                        self.frontCoverSrc = Config.CONFIG.API_URL + "/pictures/" + pictures[i].id + "/data";
                        break;
                    }
                }
            });
            if (self.frontCoverSrc == undefined ) {
                self.frontCoverSrc = "None";
            }
        });
      }
    ]
  });
