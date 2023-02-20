window.MuaHangController = function (
  $scope,
  $rootScope,
  $localStorage,
  ProductService,
  OrderService,
  OrderAdd,
  UserService,
  UserUpdate,
  OrderDetailAdd,
  ProductUpdate,
  AuthorizationService
) {
  $rootScope.checkAuthors = AuthorizationService.checkAuthors();

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

  OrderService.fetchOrders().then(function () {
    $scope.listOrders = OrderService.getOrders();
  });

  UserService.fetchUser($localStorage.id).then(function () {
    $scope.userCurrent = UserService.getUser();
  });

  $scope.datHang = function () {
    let check = confirm("Bạn có chắc chắn muốn đặt hàng không?");
    if (check) {
      let idOrder = Number($scope.listOrders.length) + 1;
      let orderAddPromise = OrderAdd.create({
        id: idOrder,
        maHD: "HD" + new Date().getTime(),
        ngayTao: new Date().getTime(),
        userId: $localStorage.id,
        thanhTien: $scope.tongTien,
        trangThai: 0,
      }).$promise;

      let orderDetailsPromises = $localStorage.gioHangThanhToan.map((item) => {
        let { id, soLuong } = item;
        let product = $scope.findProductById(id);
        return OrderDetailAdd.create({
          productId: id,
          orderId: idOrder,
          soLuong: soLuong,
          tenSP: product.tenSP,
          image: product.image,
          donGia: product.donGia,
        }).$promise;
      });

      let userUpdatePromise = UserUpdate.update(
        {
          id: $localStorage.id,
        },
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
          gioHang: $scope.userCurrent.gioHang.filter(
            (item) =>
              !$localStorage.gioHangThanhToan.some(
                (elem) => elem.id === item.id
              )
          ),
        }
      ).$promise;

      let productUpdatePromises = $localStorage.gioHangThanhToan.map((item) => {
        let { id, soLuong } = item;
        let product = $scope.findProductById(id);
        let soLuongAfter = Number(product.soLuong) - Number(soLuong);
        let soLuongBanAfter = product.soLuongBan + Number(soLuong);
        return ProductUpdate.update(
          { id: product.id },
          {
            ...product,
            soLuong: soLuongAfter,
            soLuongBan: soLuongBanAfter,
          }
        ).$promise;
      });

      Promise.all([
        orderAddPromise,
        ...orderDetailsPromises, // mảng API
        userUpdatePromise,
        ...productUpdatePromises, // mảng API
      ])
        .then((results) => {
          // alert("Tất cả các promise đã hoàn thành!");
          // alert("Kết quả trả về: ", results);
        })
        .catch((error) => {
          // alert("Đã xảy ra lỗi: ", error);
        });

      $localStorage.gioHangThanhToan = [];

      alert(
        "Bạn đã đặt hàng thành công vui lòng đợi shop xác nhận đơn hàng !!!"
      );
    }
  };
};
