'use strict';

describe('Service: androidResourceService', function () {

  // load the service's module
  beforeEach(module('NatureQuizApp'));

  // instantiate service
  var androidResourceService;
  beforeEach(inject(function (_androidResourceService_) {
    androidResourceService = _androidResourceService_;
  }));

  it('should do something', function () {
    expect(!!androidResourceService).toBe(true);
  });

});
