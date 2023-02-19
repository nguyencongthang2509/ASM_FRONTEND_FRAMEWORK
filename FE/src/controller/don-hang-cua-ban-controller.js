window.DonHangCuaBanController = function (
  $scope,
  $rootScope,
  $localStorage,
  OrderServiceByUser
) {
  if ($localStorage.vaiTro) {
    $rootScope.checkAuthors = false;
  } else {
    $rootScope.checkAuthors = true;
  }

  OrderServiceByUser.fetchOrders($localStorage.id).then(function () {
    $scope.listOrders = OrderServiceByUser.getOrders();
  });
};
