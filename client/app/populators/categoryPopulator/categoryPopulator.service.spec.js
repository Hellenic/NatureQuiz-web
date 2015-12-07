'use strict';

describe('Service: categoryPopulator', function () {

  // load the service's module
  beforeEach(module('NatureQuizApp'));

  // instantiate service
  var categoryPopulator;
  beforeEach(inject(function (_categoryPopulator_) {
    categoryPopulator = _categoryPopulator_;
  }));

  it('should do something', function () {
    expect(!!categoryPopulator).toBe(true);
  });

});
