window.GioiThieuController = function ($rootScope, AuthorizationService) {
  $rootScope.checkAuthors = AuthorizationService.checkAuthors();
};
