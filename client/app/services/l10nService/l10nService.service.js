'use strict';

angular.module('NatureQuizApp')
  .service('l10nService', function ($q, $resource, androidResourceService, localeService) {

    this.translate = function(file, object)
    {
        var deferred = $q.defer();
        var that = this;

        var resourcePromise = androidResourceService.getTranslations(file, localeService.getLocale());
        resourcePromise.then(function(translations) {
            var translation = that.translateObject(translations, object);
            deferred.resolve(translation);
        });

        return deferred.promise;
    };

    this.translateObject = function(translations, object)
    {
        for (var propertyName in object)
        {
            var property = object[propertyName];
            if (typeof(property) === 'string' && property.indexOf('/') > 0)
            {
                var type = property.split('/')[0];
                var key = property.split('/')[1];

                var translation = null;
                // Translate string-type
                if (type === '@string') {
                    translation = translations.string[key];
                }
                // Translate array-type
                else if (type === '@array') {
                    translation = translations.stringArray[key];
                }
                else {
                    console.warn('Unknown object type, unable to translate!', type);
                }

                object[propertyName] = translation;
            }
            else if (typeof(property) === 'object')
            {
                this.translateObject(translations, property);
            }
        }

        return object;
    };
});
