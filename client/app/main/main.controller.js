'use strict';

angular.module('NatureQuizApp')
  .controller('MainCtrl', function ($scope, categoryService, categoryPopulator) {

    $scope.categories = [];

    var promise = categoryService.getCategories();
    promise.then(function(categories) {
        $scope.categories = categoryPopulator.populateCategories(categories);
    }, function(reason) {
        console.log('TODO Loading of categories failed...', reason);
    }, function(categories) {
        // TODO Handle categories update
        $scope.categories = categoryPopulator.populateCategories(categories);
    });

  });
