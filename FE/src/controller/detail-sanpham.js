window.DetailSanphamController = function (
  $scope,
  $routeParams,
  ProductService,
  $localStorage,
  $rootScope
) {

  if ($localStorage.vaiTro) {
    $rootScope.checkAuthors = true;
  } else {
    $rootScope.checkAuthors = false;
  }

  ProductService.fetchProducts().then(function () {
    $scope.product = ProductService.getProducts().filter((product) => {
      return product.id == $routeParams.id;
    })[0];
  });
};
