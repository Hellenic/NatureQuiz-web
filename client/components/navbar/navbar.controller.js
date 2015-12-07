'use strict';

angular.module('NatureQuizApp')
  .controller('NavbarCtrl', function ($scope, $location, $rootScope, $resource, localeService) {
    
    // Load the localization file
    var locale = localeService.getLocale();
    $resource('assets/localization/:locale/:file.json', {locale: locale, file: 'localizations'}).get(function(localizedTexts) {
        // Save the localizations to rootscope so it's usable by all
        $rootScope.loc = localizedTexts;
    });

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
        return route === $location.path();
    };
  });
