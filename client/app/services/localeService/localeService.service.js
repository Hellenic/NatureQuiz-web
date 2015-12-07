'use strict';

angular.module('NatureQuizApp')
  .service('localeService', function (storageService) {

      var LOCALE_KEY = 'quiz-locale';

      this.getDefaultLocale = function()
      {
          // TODO Default to browser locale?
          // var language = window.navigator.userLanguage || window.navigator.language;
          return 'en';
      };

      this.getLocale = function()
      {
          var locale = storageService.load(LOCALE_KEY);
          if (!Boolean(locale))
          {
              locale = this.getDefaultLocale();
              this.setLocale(locale);
          }

          return locale;
      };

      this.setLocale = function(locale)
      {
          storageService.save(LOCALE_KEY, locale);
      };

  });
