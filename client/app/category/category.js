'use strict';

angular.module('NatureQuizApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('category', {
        url: '/categories/:categoryId',
        templateUrl: 'app/category/category.html',
        controller: 'CategoryCtrl'
      });
  });
