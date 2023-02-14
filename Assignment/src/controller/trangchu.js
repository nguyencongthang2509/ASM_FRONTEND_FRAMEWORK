window.TrangChuController = function (
  $scope,
  $localStorage,
  $http,
  $rootScope,
  ProductService,
  UserService
) {
  $scope.username = $localStorage.username;

  if ($localStorage.vaiTro) {
    $rootScope.checkAuthors = true;
  } else {
    $rootScope.checkAuthors = true;
  }

  ProductService.fetchProducts().then(function () {
    $scope.listProduct = ProductService.getProducts();
  });

  $scope.findProductById = function (id) {
    return ProductService.getProducts().filter((sv) => {
      return sv.id == id;
    })[0];
  };

  var id = "";

  $scope.cartAction = function (event, idNew) {
    if ($localStorage.username == null) {
      window.open("../src/dangnhap.html", "_self");
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

  $scope.addToCart = function () {
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

    $http
      .put(`${userAPI}/${idUser}`, {
        ma: $scope.userCurrent.ma,
        hoTen: $scope.userCurrent.hoTen,
        ngaySinh: $scope.userCurrent.ngaySinh,
        gioiTinh: $scope.userCurrent.gioiTinh,
        sdt: $scope.userCurrent.sdt,
        email: $scope.userCurrent.email,
        matKhau: $scope.userCurrent.matKhau,
        vaiTro: $scope.userCurrent.vaiTro,
        gioHang: gioHangAfterUpdate,
      })
      .then(
        function (response) {
          if (response.status === 200) {
            alert("Đã thêm sản phẩm vào giỏ hàng");
          }
        },
        function (errors) {
          console.log(errors);
        }
      );
  };

  document.querySelector("#inputFile").addEventListener("input", function () {
    var formData = new FormData();

    var file = document.querySelector("#inputFile").files[0];


    formData.append("file", file);

    document.querySelector("#imgValue").src = URL.createObjectURL(file);

    //   $http
    //     .post("http://localhost:8080/dowload", formData, {
    //       transformRequest: angular.identity,
    //       headers: { "Content-Type": undefined },
    //     })
    //     .then(
    //       function (response) {
    //         if (response.status === 200) {

    //         }
    //       },
    //       function (error) {}
    //     );
  });
};
