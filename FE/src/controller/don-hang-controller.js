window.DonHangController = function (
  $scope,
  $rootScope,
  AuthorizationService,
  OrderService,
  OrderServiceByOrderId,
  UsersService,
  OrderUpdate
) {
  $rootScope.checkAuthors = !AuthorizationService.checkAuthors();

  $scope.activeLink = 0;
  $scope.trangThai = 0;

  $scope.actionClick = function (trangThai) {
    $scope.trangThai = trangThai;
    $scope.activeLink = trangThai;
  };

  UsersService.fetchUsers().then(function () {
    $scope.listUsers = UsersService.getUsers();
  });

  $scope.findUserById = function (id) {
    return UsersService.getUsers().filter((user) => {
      return user.id == id;
    })[0];
  };

  OrderService.fetchOrders().then(function () {
    $scope.listOrders = OrderService.getOrders();
    let soLuongDonHangChoXacNhan = 0;
    let soLuongDonHangChoLayHang = 0;
    let soLuongDonHangDangGiao = 0;
    $scope.listOrders.forEach((item) => {
      if (item.trangThai == 0) {
        soLuongDonHangChoXacNhan++;
      }
      if (item.trangThai == 1) {
        soLuongDonHangChoLayHang++;
      }
      if (item.trangThai == 2) {
        soLuongDonHangDangGiao++;
      }
    });

    $scope.soLuongDonHangChoXacNhan = soLuongDonHangChoXacNhan;
    $scope.soLuongDonHangChoLayHang = soLuongDonHangChoLayHang;
    $scope.soLuongDonHangDangGiao = soLuongDonHangDangGiao;
  });

  $scope.chuanBiHang = function (id) {
    let check = confirm(
      "Bạn có chắc muốn cập nhật trạng thái hóa đơn không?"
    );
    if (check) {
      OrderServiceByOrderId.fetchOrder(id).then(function () {
        $scope.orderFindById = OrderServiceByOrderId.getOrder();

        if ($scope.trangThai == 0) {
          $scope.orderFindById.trangThai = 1;
        }else if($scope.trangThai == 1){
          $scope.orderFindById.trangThai = 2;
        }else if($scope.trangThai == 2){
          $scope.orderFindById.trangThai = 3;
        }

        OrderUpdate.update({ id: id }, $scope.orderFindById).$promise.then(
          function (response) {
            alert("Cập nhật thành công");
            $location.path("/don-hang");
          },
          function (errors) {
            console.log(errors);
          }
        );
      });
    }
  };
};
