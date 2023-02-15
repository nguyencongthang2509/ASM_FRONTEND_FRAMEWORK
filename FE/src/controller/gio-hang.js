window.GioHangController = function (
  $scope,
  $rootScope,
  $localStorage,
  ProductService,
  UserService,
  UserUpdate
) {
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

  UserService.fetchUser($localStorage.id).then(function () {
    $scope.userCurrent = UserService.getUser();
  });

  $scope.changeInput = function (id, index) {
    var gioHangAfterUpdate = [];

    for (var item of $scope.userCurrent.gioHang) {
      if (item.id == id) {
        item.soLuong = Number(
          document.querySelectorAll("#inputValue")[index].value
        );
      }
      gioHangAfterUpdate.push(item);
    }

    UserUpdate.update(
      { id: $localStorage.id },
      {
        ma: $scope.userCurrent.ma,
        hoTen: $scope.userCurrent.hoTen,
        ngaySinh: $scope.userCurrent.ngaySinh,
        gioiTinh: $scope.userCurrent.gioiTinh,
        sdt: $scope.userCurrent.sdt,
        email: $scope.userCurrent.email,
        matKhau: $scope.userCurrent.matKhau,
        vaiTro: $scope.userCurrent.vaiTro,
        gioHang: gioHangAfterUpdate,
      }
    ).$promise.then(
      function (response) {},
      function (error) {}
    );
  };

  $scope.deleteGioHang = function(id){
    let confirm = confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng hay không?"); 
    if(confirm){
      
    }
  }
};
