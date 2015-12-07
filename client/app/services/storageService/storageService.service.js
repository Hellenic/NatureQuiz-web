'use strict';

angular.module('NatureQuizApp')
  .service('storageService', function () {

      // TODO Cookie fallback
      // TODO JSON fallback
      //window.localStorage = window.localStorage || {};

      this.save = function(key, value)
      {
          var jsonValue = JSON.stringify(value);
          localStorage.setItem(key, jsonValue);
      };

      this.load = function(key)
      {
          var value = localStorage.getItem(key);
          return JSON.parse(value);
      };

  });
