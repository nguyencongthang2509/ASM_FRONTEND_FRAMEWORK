window.DonHangController = function($rootScope, $localStorage){
    if ($localStorage.vaiTro) {
        $rootScope.checkAuthors = true;
      } else {
        $rootScope.checkAuthors = false;
      }
}