window.DonHangCuaBanController = function (
  $scope,
  $rootScope,
  $localStorage,
  OrderServiceByUser,
  AuthorizationService
) {
  $rootScope.checkAuthors = AuthorizationService.checkAuthors();

  $scope.listOrders = [];
  $scope.trangThai = 0;

  OrderServiceByUser.fetchOrders($localStorage.id).then(function () {
    $scope.listOrders = OrderServiceByUser.getOrders();
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

  $scope.actionClick = function (trangThai) {
    $scope.trangThai = trangThai;
  };
};
