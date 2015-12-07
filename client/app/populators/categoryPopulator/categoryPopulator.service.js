'use strict';

angular.module('NatureQuizApp')
  .service('categoryPopulator', function (progressService) {

    this.populateCategories = function(categories)
    {
        for (var i=0; i<categories.length; i++)
        {
          categories[i] = this.populateCategory(categories[i]);
        }

        return categories;
    };

    this.populateCategory = function(category)
    {
        // Get the saved category progress
        var categoryProgress = progressService.getCategoryProgress(category.id);

        // Populate the progress information to category data
        var levelCount = category.levelCount || category.levels.length;
        var progressPercent = Math.floor(categoryProgress.completedLevelIds.length / levelCount * 100);
        category.progressPercent = progressPercent;

        return category;
    };

  });
