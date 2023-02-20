window.GioHangController = function (
  $scope,
  $rootScope,
  $localStorage,
  $location,
  ProductService,
  UserService,
  UserUpdate,
  AuthorizationService
) {
  $rootScope.checkAuthors = AuthorizationService.checkAuthors();

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
        image: $scope.userCurrent.image,
        diaChi: $scope.userCurrent.diaChi,
        email: $scope.userCurrent.email,
        matKhau: $scope.userCurrent.matKhau,
        vaiTro: $scope.userCurrent.vaiTro,
        gioHang: gioHangAfterUpdate,
      }
    ).$promise.then(
      function (response) {
        alert("Cập nhật thành công");
      },
      function (error) {}
    );
  };

  $scope.deleteGioHang = function (id) {
    let check = confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng hay không?"
    );
    if (check) {
      var gioHangAfterUpdate = [];

      for (var item of $scope.userCurrent.gioHang) {
        if (item.id == id) {
          continue;
        }
        gioHangAfterUpdate.push(item);
      }

      UserUpdate.update(
        { id: $localStorage.id },
        {
          ma: $scope.userCurrent.ma,
          hoTen: $scope.userCurrent.hoTen,
          ngaySinh: $scope.userCurrent.ngaySinh,
          image: $scope.userCurrent.image,
          diaChi: $scope.userCurrent.diaChi,
          gioiTinh: $scope.userCurrent.gioiTinh,
          sdt: $scope.userCurrent.sdt,
          email: $scope.userCurrent.email,
          matKhau: $scope.userCurrent.matKhau,
          vaiTro: $scope.userCurrent.vaiTro,
          gioHang: gioHangAfterUpdate,
        }
      ).$promise.then(
        function (response) {
          alert("Xóa thành công khỏi giỏ hàng");
        },
        function (error) {}
      );
    }
  };

  $scope.findGioHangById = function (id) {
    return $scope.listGioHang.filter((gh) => {
      return gh.id == id;
    })[0];
  };

  $scope.tongTien = 0;

  $scope.actionChecked = function () {
    let sum = 0;
    let count = 0;
    let listCheckbox = document.querySelectorAll('[ng-model="checkboxCon"]');
    let checkboxCha = document.querySelector('[ng-model="checkboxCha"]');
    listCheckbox.forEach((item) => {
      if (item.checked) {
        sum += Number(
          $scope.findProductById(item.value).donGia *
            $scope.findGioHangById(item.value).soLuong
        );
        ++count;
      }
    });
    if (count == listCheckbox.length) {
      checkboxCha.checked = true;
    } else {
      checkboxCha.checked = false;
    }
    $scope.tongTien = sum;
  };

  $scope.actionCheckedCha = function () {
    let sum = 0;
    let listCheckBoxCon = document.querySelectorAll('[ng-model="checkboxCon"]');
    let checkboxCha = document.querySelector('[ng-model="checkboxCha"]');
    if (checkboxCha.checked) {
      listCheckBoxCon.forEach((item) => {
        item.checked = true;
        sum += Number(
          $scope.findProductById(item.value).donGia *
            $scope.findGioHangById(item.value).soLuong
        );
      });
    } else {
      listCheckBoxCon.forEach((item) => {
        item.checked = false;
      });
    }
    $scope.tongTien = sum;
  };

  $localStorage.gioHangThanhToan = [];

  $scope.muaHang = function () {
    let listCheckBoxCon = document.querySelectorAll('[ng-model="checkboxCon"]');
    let check = false;
    $scope.listGioHang.forEach((gh) => {
      listCheckBoxCon.forEach((cb) => {
        if (gh.id == cb.value && cb.checked) {
          $localStorage.gioHangThanhToan.push(gh);
          check = true;
        }
      });
    });

    if (!check) {
      alert("Bạn chưa chọn sản phẩm để mua hàng !!!");
      return;
    }

    $location.path("mua-hang");
  };
};
