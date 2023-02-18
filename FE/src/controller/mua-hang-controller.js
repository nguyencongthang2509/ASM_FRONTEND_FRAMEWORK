window.MuaHangController = function ($scope, $rootScope, $localStorage) {
  if ($localStorage.vaiTro) {
    $rootScope.checkAuthors = false;
  } else {
    $rootScope.checkAuthors = true;
  }

  
};
