window.DonHangController = function (
  $scope,
  $rootScope,
  AuthorizationService,
  OrderService,
  UsersService
) {
  $rootScope.checkAuthors = !AuthorizationService.checkAuthors();

  $scope.activeLink = 0;

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
};
