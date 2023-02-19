window.MuaHangController = function (
  $scope,
  $rootScope,
  $localStorage,
  ProductService
) {
  if ($localStorage.vaiTro) {
    $rootScope.checkAuthors = false;
  } else {
    $rootScope.checkAuthors = true;
  }

  $scope.listGioHangMuaHang = $localStorage.gioHangThanhToan;

  $scope.findProductById = function (id) {
    return ProductService.getProducts().filter((sv) => {
      return sv.id == id;
    })[0];
  };

  $scope.fetchProducts = function () {
    $scope.tongTien = 0;

    ProductService.fetchProducts().then(function () {
      $scope.list = ProductService.getProducts();
      $localStorage.gioHangThanhToan.forEach((item) => {
        $scope.tongTien =
          $scope.tongTien +
          $scope.findProductById(item.id).donGia * item.soLuong;
      });
    });
  };

  $scope.fetchProducts();

  $scope.deleteProduct = function (index) {
    $localStorage.gioHangThanhToan.splice(index, 1);
    $scope.fetchProducts();
  };
};
