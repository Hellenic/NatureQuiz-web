'use strict';

angular.module('NatureQuizApp')
  .service('settingsService', function (storageService, localeService) {

    var SETTINGS_KEY = 'quiz-settings';

    this.getSettings = function()
    {
        var settings = storageService.load(SETTINGS_KEY);
        if (!Boolean(settings))
        {
            settings = {
                locale: localeService.getLocale()
            };
            this.setSettings(settings);
        }
        
        return settings;
    };

    this.setSettings = function(settings)
    {
        storageService.save(SETTINGS_KEY, settings);
        localeService.setLocale(settings.locale);
    };
  });
