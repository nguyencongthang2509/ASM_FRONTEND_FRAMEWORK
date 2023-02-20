window.VeChungToiController = function ($rootScope, $localStorage, AuthorizationService) {
    $rootScope.checkAuthors = AuthorizationService.checkAuthors();
};
