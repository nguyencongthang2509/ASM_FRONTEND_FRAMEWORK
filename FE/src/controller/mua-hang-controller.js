window.MuaHangController = function ($scope, $rootScope, $localStorage, ProductService) {
  if ($localStorage.vaiTro) {
    $rootScope.checkAuthors = false;
  } else {
    $rootScope.checkAuthors = true;
  }

  ProductService.fetchProducts().then(function () {
    $scope.list = ProductService.getProducts();
  });

  $scope.findProductById = function (id) {
    return ProductService.getProducts().filter((sv) => {
      return sv.id == id;
    })[0];
  };

  $scope.listGioHangMuaHang = $localStorage.gioHangThanhToan;

};
