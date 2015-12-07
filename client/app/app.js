'use strict';

angular.module('NatureQuizApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ui.router',
  'ui.bootstrap'
])
.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $tooltipProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

    // Trigger for answer input on category page
    $tooltipProvider.setTriggers({'answerAttempt': 'answerAttemptClose'});
});
