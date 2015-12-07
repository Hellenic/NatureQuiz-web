'use strict';

/**
 * Android Resource XML files has been converted to JSON by Grunt.
 * This service fetches those JSON files and translates them to
 * a arrays that are easier to handle.
 */

angular.module('NatureQuizApp')
  .service('androidResourceService', function ($q, $resource) {

      this.getTranslations = function(file, locale)
      {
          var deferred = $q.defer();
          var that = this;

          $resource('assets/localization/:locale/:file.json', {locale: locale, file: file}).get(function(data) {
              var androidStrings = data.resources.string;
              var androidStringArrays = data.resources['string-array'];

              var strings = that.transformStrings(androidStrings);
              var stringArrays = that.transformStringArrays(androidStringArrays);

              var resources = {
                  string: strings,
                  stringArray: stringArrays
              };

              deferred.resolve(resources);
          });

          return deferred.promise;
      };

      this.transformStrings = function(androidStrings)
      {
          if (!androidStrings) {
              return [];
          }

          var strings = [];
          for (var i=0; i<androidStrings.length; i++)
          {
              var key = androidStrings[i].name;
              var value = androidStrings[i]._;

              strings[key] = value;
          }

          return strings;
      };

      this.transformStringArrays = function(androidStringArrays)
      {
          if (!androidStringArrays) {
              return [];
          }

          var stringArrays = [];
          for (var i=0; i<androidStringArrays.length; i++)
          {
              var key = androidStringArrays[i].name;
              var values = androidStringArrays[i].item;

              // When string-array has only single value, it comes as a string
              // When it's multiple values, it comes as a string array

              // For consistency, transforming strings to arrays as well
              if (!(values instanceof Array))
              {
                  values = [values];
              }

              stringArrays[key] = values;
          }

          return stringArrays;
      };

  });
