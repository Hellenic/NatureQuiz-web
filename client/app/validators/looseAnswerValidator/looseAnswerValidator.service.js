'use strict';

angular.module('NatureQuizApp')
  .service('looseAnswerValidator', function () {

      this.validate = function(level, answerAttempt)
      {
          if (!answerAttempt)
          {
              return false;
          }

          var cleanedAnswer = answerAttempt.trim().toLowerCase();
          
          for (var i=0; i<level.answers.length; i++)
          {
              var possibleAnswer = level.answers[i];
              if (cleanedAnswer === possibleAnswer)
              {
                  return true;
              }
          }

          return false;
      };

  });
