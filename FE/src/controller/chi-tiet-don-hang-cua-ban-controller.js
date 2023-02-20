window.ChiTietDonHangCuaBanController = function (
  $scope,
  $rootScope,
  $routeParams,
  OrderServiceById,
  OrderDetailService,
  AuthorizationService
) {
  $rootScope.checkAuthors = AuthorizationService.checkAuthors();

  let orderId = $routeParams.id;

  OrderServiceById.fetchOrder(orderId).then(function () {
    $scope.order = OrderServiceById.getOrder();
  });
};
