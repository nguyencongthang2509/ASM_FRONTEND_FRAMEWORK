window.DonHangController = function($rootScope, AuthorizationService){
  $rootScope.checkAuthors = !AuthorizationService.checkAuthors();
}