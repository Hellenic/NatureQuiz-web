'use strict';

angular.module('NatureQuizApp')
  .controller('CategoryCtrl', function ($scope, $stateParams, $timeout, $modal,
      categoryService, progressService, categoryPopulator, looseAnswerValidator) {

      var promise = categoryService.getCategory($stateParams.categoryId);
      promise.then(function(category) {
          $scope.category = categoryPopulator.populateCategory(category);

          $scope.formClass = '';
      });

      $scope.next = function()
      {
          $scope.formClass = '';
          $scope.answerInput = '';

          var carouselScope = $scope.findCarouselScope($scope);
          carouselScope.next();

          var activeLevel = $scope.findActiveLevel();
          progressService.setActiveLevel($scope.category, activeLevel.id);
      };

      $scope.prev = function()
      {
          $scope.formClass = '';
          $scope.answerInput = '';

          var carouselScope = $scope.findCarouselScope($scope);
          carouselScope.prev();

          var activeLevel = $scope.findActiveLevel();
          progressService.setActiveLevel($scope.category, activeLevel.id);
      };

      $scope.select = function(slide)
      {
          $scope.formClass = '';
          $scope.answerInput = '';

          var carouselScope = $scope.findCarouselScope($scope);
          carouselScope.select(slide);

          var activeLevel = $scope.findActiveLevel();
          progressService.setActiveLevel($scope.category, activeLevel.id);
      };

      $scope.isCompleted = function(slide)
      {
          var carouselScope = $scope.findCarouselScope($scope);

          // Get level by slide
          var slideIndex = carouselScope.slides.indexOf(slide);
          var level = $scope.category.levels[slideIndex];

          return progressService.isLevelCompleted($scope.category, level);
      };

      $scope.openLevelModal = function(category, level) {

          var modalInstance = $modal.open({
              animation: true,
              templateUrl: 'template/modal/levelModalContent.html',
              controller: 'ModalInstanceCtrl',
              resolve: {
                  level: function () {
                      return level;
                  },
                  category: function() {
                      return category;
                  }
              }
          });

          modalInstance.result.then(function () {
              $scope.next();
          });
      };

      $scope.answer = function()
      {
          $scope.answerAttemptPopover(false);

          var activeLevel = $scope.findActiveLevel();
          var answerAttempt = this.answerInput;

          var result = looseAnswerValidator.validate(activeLevel, answerAttempt);
          if (!result) {
              $scope.answerAttemptPopover(true);
          }
          else
          {
              $scope.formClass = 'has-success';
              $scope.openLevelModal($scope.category, activeLevel);
              progressService.completeLevel($scope.category, activeLevel);
              this.answerInput = '';
          }
      };

      $scope.answerAttemptPopover = function(toggle) {
          if (!toggle)
          {
              $timeout(function() {
                  $('#answer-input').trigger('answerAttemptClose');
                  $scope.formClass = '';
              }, 0);
          }
          else
          {
              $timeout(function() {
                  $('#answer-input').trigger('answerAttempt');
                  $scope.formClass = 'has-warning';
              }, 0);
          }
      };

      $scope.findActiveLevel = function() {
          var index = $scope.findActiveIndex();
          if (index < 0)
          {
              return null;
          }

          return $scope.category.levels[index];
      };

      $scope.findActiveIndex = function() {
          var carouselScope = $scope.findCarouselScope($scope);
          for (var i=0; i<carouselScope.slides.length; i++)
          {
              var slide = carouselScope.slides[i];
              if (slide.active)
              {
                  return i;
              }
          }

          return -1;
      };

      // Quite dirty hack, but carousel doesn't seem to provide any other way of fetching information
      $scope.findCarouselScope = function(scope) {
          for(var cs = scope.$$childHead; cs; cs = cs.$$nextSibling) {
              if (cs !== null && cs.$$childHead !== null && cs.$$childHead.hasOwnProperty('slides'))
              {
                  return cs.$$childHead;
              }
          }

          return null;
      };
  });
