window.SanPhamKhachHangController = function (
  $scope,
  $rootScope,
  AuthorizationService,
  CategoryService,
  $localStorage,
  UserService,
  ProductService,
  UserUpdate
) {
  $rootScope.checkAuthors = AuthorizationService.checkAuthors();

  CategoryService.fetchCategories().then(function () {
    $scope.listCategory = CategoryService.getCategory();
  });

  ProductService.fetchProducts().then(function () {
    $scope.listProducts = ProductService.getProducts();
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
        alert("Đã thêm sản phẩm vào giỏ hàng");
      },
      function (error) {}
    );
  };

  $scope.checkboxFather = true;
  $scope.checkboxChecked = true;

  $scope.actionChecked = function () {
    let listProductChecked = [];
    let selectedCategories = [];
    let listCheckBox = document.querySelectorAll(
      '[ng-model="checkboxChecked"]'
    );
    let checkboxCha = document.querySelector('[ng-model="checkboxFather"]');
    // Lấy tất cả các checkbox được chọn
    listCheckBox.forEach((item) => {
      if (item.checked == true) {
        selectedCategories.push(Number(item.value));
      }
    });
    if (selectedCategories.length != $scope.listCategory.length) {
      checkboxCha.checked = false;
    } else {
      checkboxCha.checked = true;
    }
    // Hiển thị các sản phẩm
    let listAPI = [];
    ProductService.fetchProducts().then(function () {
      listAPI = ProductService.getProducts();
      listProductChecked = listAPI.filter((itemPr) =>
        selectedCategories.includes(itemPr.categoryId)
      );
      $scope.listProducts = listProductChecked;
    });
  };

  $scope.selectAll = function () {
    let listCheckBox = document.querySelectorAll(
      '[ng-model="checkboxChecked"]'
    );
    let checkboxCha = document.querySelector('[ng-model="checkboxFather"]');
    if (checkboxCha.checked) {
      listCheckBox.forEach((item) => {
        item.checked = true;
      });
      ProductService.fetchProducts().then(function () {
        $scope.listProducts = ProductService.getProducts();
      });
    } else {
      listCheckBox.forEach((item) => {
        item.checked = false;
      });
      $scope.listProducts = [];
    }
  };
};
