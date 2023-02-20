window.DetailSanphamController = function (
  $scope,
  $rootScope,
  $routeParams,
  ProductService,
  AuthorizationService
) {

  $rootScope.checkAuthors = !AuthorizationService.checkAuthors();

  ProductService.fetchProducts().then(function () {
    $scope.product = ProductService.getProducts().filter((product) => {
      return product.id == $routeParams.id;
    })[0];
  });
};
