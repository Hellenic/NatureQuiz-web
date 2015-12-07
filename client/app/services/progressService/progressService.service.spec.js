'use strict';

describe('Service: progressService', function () {

  // load the service's module
  beforeEach(module('NatureQuizApp'));

  // instantiate service
  var progressService;
  beforeEach(inject(function (_progressService_) {
    progressService = _progressService_;
  }));

  it('definitely should exist before testing', function () {
      expect(!!progressService).toBe(true);
  });

  it('should return proper objects when loading', function () {
      var progress = progressService.getCategoryProgress('unknown');
      expect(progress).not.toBeUndefined();
      /*
      expect(progress).toEqual(jasmine.objectContaining({
          currentLevel: jasmine.any(Number),
          completedLevels: []
      }));
      */
  });

});
