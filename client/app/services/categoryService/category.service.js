'use strict';

angular.module('NatureQuizApp')
.service('categoryService', function ($q, $resource, $stateParams, l10nService) {

    this.getCategory = function(categoryId)
    {
        var deferred = $q.defer();
        $resource('assets/categories/:categoryId.json', {categoryId: categoryId}).get(function(data) {
            var category = data.category;
            category.id = $stateParams.categoryId;
            category.levels = category.levels.level;
            
            // Translate the category object
            var translationPromise = l10nService.translate(category.id, category);
            translationPromise.then(function(translatedCategory) {
                deferred.resolve(translatedCategory);
            });
        });

        return deferred.promise;
    };

    /* jshint ignore:start */
    this.getCategories = function()
    {
        var deferred = $q.defer();

        $resource('assets/categories/:categoryId.json', {categoryId: 'categories', isArray: true}).query(function(categories) {

            var translatedCategories = [];
            for (var i=0; i<categories.length; i++)
            {
                var category = categories[i];

                // Translate the category object
                var translationPromise = l10nService.translate(category.id, category);
                translationPromise.then(function(translatedCategory) {
                    translatedCategories.push(translatedCategory);

                    // Send an update of already translated categories
                    deferred.notify(translatedCategories);

                    if (translatedCategories.length === categories.length)
                    {
                        deferred.resolve(translatedCategories);
                    }
                });
            }

        });

        return deferred.promise;
    };
    /* jshint ignore:end */
});
