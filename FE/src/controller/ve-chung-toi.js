window.VeChungToiController = function ($rootScope, $localStorage) {
  if ($localStorage.vaiTro) {
    $rootScope.checkAuthors = false;
  } else {
    $rootScope.checkAuthors = true;
  }
};
