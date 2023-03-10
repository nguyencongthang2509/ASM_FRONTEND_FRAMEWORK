window.TrangChuController = function (
  $scope,
  $localStorage,
  $rootScope,
  ProductService,
  UserService,
  $filter,
  UserUpdate
) {
  $rootScope.checkAuthors = true;

  ProductService.fetchProducts().then(function () {
    $scope.listProduct = ProductService.getProducts();
    $scope.filteredData = $filter("orderBy")($scope.listProduct, "-ngayTao");
    $scope.filteredData = $scope.filteredData.slice(0, 8);
  });

  $scope.findProductById = function (id) {
    return ProductService.getProducts().filter((sv) => {
      return sv.id == id;
    })[0];
  };

  var id = "";

  $scope.cartAction = function (event, idNew) {
    if ($localStorage.id == null) {
      window.open("../src/dang-nhap.html", "_self");
    }
    event.preventDefault();
    $scope.soLuongMua = 0;
    id = idNew;
    $scope.idSP = idNew;
  };

  $scope.soLuongMua = 0;
  const idUser = $localStorage.id;

  UserService.fetchUser(idUser).then(function () {
    $scope.userCurrent = UserService.getUser();
  });

  $scope.addToCart = function (event) {
    event.preventDefault();
    var product = $scope.findProductById(Number(id));
    var gioHangAfterUpdate = [];
    var check = true;

    for (var item of $scope.userCurrent.gioHang) {
      if (item.id == product.id) {
        item.soLuong = item.soLuong + $scope.soLuongMua;
        check = false;
      }
      gioHangAfterUpdate.push(item);
    }

    if (check) {
      var gioHangObject = {
        id: product.id,
        soLuong: $scope.soLuongMua,
      };
      gioHangAfterUpdate.push(gioHangObject);
    }

    UserUpdate.update(
      { id: idUser },
      {
        ma: $scope.userCurrent.ma,
        hoTen: $scope.userCurrent.hoTen,
        ngaySinh: $scope.userCurrent.ngaySinh,
        gioiTinh: $scope.userCurrent.gioiTinh,
        sdt: $scope.userCurrent.sdt,
        image: $scope.userCurrent.image,
        diaChi: $scope.userCurrent.diaChi,
        email: $scope.userCurrent.email,
        matKhau: $scope.userCurrent.matKhau,
        vaiTro: $scope.userCurrent.vaiTro,
        gioHang: gioHangAfterUpdate,
      }
    ).$promise.then(
      function (response) {
        alert("???? th??m s???n ph???m v??o gi??? h??ng");
      },
      function (error) {}
    );
  };

  $scope.activeTrangChu = 0;

  $scope.sanPhamMoi = function (index) {
    $scope.filteredData = $filter("orderBy")($scope.listProduct, "-ngayTao");
    $scope.filteredData = $scope.filteredData.slice(0, 8);
    $scope.activeTrangChu = index;
  };

  $scope.banChay = function (index) {
    $scope.filteredData = $filter("orderBy")($scope.listProduct, "-soLuongBan");
    $scope.filteredData = $scope.filteredData.slice(0, 8);
    $scope.activeTrangChu = index;
  };
};
