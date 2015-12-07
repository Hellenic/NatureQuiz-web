'use strict';

angular.module('NatureQuizApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('help', {
        url: '/help',
        templateUrl: 'app/help/help.html',
        controller: 'HelpCtrl'
      });
  });
