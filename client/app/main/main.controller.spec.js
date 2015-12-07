'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('NatureQuizApp'));

  var MainCtrl, scope;

  beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      MainCtrl = $controller('MainCtrl', {
          $scope: scope
      });
  }));

  it('should do something', function () {
      expect(!!MainCtrl).toBe(true);
  });
});
