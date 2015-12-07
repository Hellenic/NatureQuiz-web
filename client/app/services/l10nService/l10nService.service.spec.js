'use strict';

describe('Service: l10nService', function () {

  // load the service's module
  beforeEach(module('NatureQuizApp'));

  // instantiate service
  var l10nService;
  beforeEach(inject(function (_l10nService_) {
    l10nService = _l10nService_;
  }));

  it('should do something', function () {
    expect(!!l10nService).toBe(true);
  });

});
