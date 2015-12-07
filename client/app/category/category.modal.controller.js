'use strict';
angular.module('NatureQuizApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance, level, category) {

    $scope.level = level;
    $scope.category = category;

    $scope.close = function () {
        $modalInstance.close();
    };
});
