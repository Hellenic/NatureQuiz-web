'use strict';

angular.module('NatureQuizApp')
  .service('progressService', function (storageService) {

      var PROGRESS_KEY = 'quiz-progress';

      this.setProgress = function(progress)
      {
          storageService.save(PROGRESS_KEY, progress);
      };

      this.getProgress = function()
      {
          var progress = storageService.load(PROGRESS_KEY);
          if (!Boolean(progress))
          {
              progress = {};
              this.setProgress(progress);
          }

          return progress;
      };

      this.initCategoryProgress = function()
      {
          return {
              activeLevelId: 1,
              completedLevelIds: []
          };
      };

      this.setCategoryProgress = function(categoryId, categoryProgress)
      {
          var progress = this.getProgress();
          progress[categoryId] = categoryProgress;
          this.setProgress(progress);
      };

      this.getCategoryProgress = function(categoryId)
      {
          var progress = this.getProgress();
          if (!progress.hasOwnProperty(categoryId))
          {
              progress[categoryId] = this.initCategoryProgress();
              this.setProgress(progress);
          }

          return progress[categoryId];
      };

      this.setActiveLevel = function(category, levelId)
      {
          var categoryProgress = this.getCategoryProgress(category.id);
          categoryProgress.activeLevelId = levelId;
          this.setCategoryProgress(category.id, categoryProgress);
      };

      this.getActiveLevel = function(category)
      {
          var categoryProgress = this.getCategoryProgress(category.id);
          for (var i=0; i<category.levels.length; i++)
          {
              var level = category.levels[i];
              if (categoryProgress.activeLevelId === level.id)
              {
                  return level;
              }
          }

          return null;
      };

      this.completeLevel = function(category, level)
      {
          var categoryProgress = this.getCategoryProgress(category.id);
          categoryProgress.completedLevelIds.push(level.id);
          this.setCategoryProgress(category.id, categoryProgress);
      };

      this.isLevelCompleted = function(category, level)
      {
          var categoryProgress = this.getCategoryProgress(category.id);
          return (categoryProgress.completedLevelIds.indexOf(level.id) >= 0);
      };
  });
