'use strict';

angular.module('NatureQuizApp')
  .controller('SettingsCtrl', function ($scope, settingsService, $state) {

      $scope.locale = settingsService.getSettings().locale;

      $scope.$watch('locale', function(newLocale, oldLocale) {
          if (newLocale !== oldLocale)
          {
              var settings = settingsService.getSettings();
              settings.locale = newLocale;
              settingsService.setSettings(settings);
              $state.reload();
          }
      });

      // TODO Remove later
      $scope.reset = function() {
          localStorage.clear();
          $scope.locale = settingsService.getSettings().locale;
      };
  });
