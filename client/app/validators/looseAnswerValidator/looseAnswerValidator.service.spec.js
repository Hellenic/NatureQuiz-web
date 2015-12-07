'use strict';

describe('Service: looseAnswerValidator', function () {

  // load the service's module
  beforeEach(module('NatureQuizApp'));

  // instantiate service
  var looseAnswerValidator;
  beforeEach(inject(function (_looseAnswerValidator_) {
      looseAnswerValidator = _looseAnswerValidator_;
  }));

  it('should do something', function () {
    expect(!!looseAnswerValidator).toBe(true);
  });

});
