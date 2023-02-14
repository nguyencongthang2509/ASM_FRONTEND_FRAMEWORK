window.SanPhamController = function (
  $scope,
  $http,
  $rootScope,
  ProductService,
  CategoryService,
  $localStorage
) {
  if ($localStorage.vaiTro) {
    $rootScope.checkAuthors = true;
  } else {
    $rootScope.checkAuthors = false;
  }

  CategoryService.fetchCategories().then(function () {
    $scope.listCategory = CategoryService.getCategory();
  });

  ProductService.fetchProducts().then(function () {
    $scope.list = ProductService.getProducts();
  });

  document.querySelector("#valueImage").addEventListener("input", function () {
    var formData = new FormData();
    var file = document.querySelector("#valueImage").files[0];
    formData.append("file", file);
    document.querySelector("#showImage").src = URL.createObjectURL(file);
  });

  $scope.tenSPAdd = "";
  $scope.donGiaAdd = "";
  $scope.soLuongAdd = "";
  $scope.categoryAdd = "1";

  $scope.addProduct = function () {
    var formData = new FormData();

    var file = document.querySelector("#valueImage").files[0];

    formData.append("file", file);

    $http
      .post("http://localhost:8080/dowload", formData, {
        transformRequest: angular.identity,
        headers: { "Content-Type": undefined },
      })
      .then(
        function (response) {
          if (response.status === 200) {
          }
        },
        function (error) {}
      );

    $http
      .post(productsAPI, {
        id: Number($scope.list.length) + 1,
        maSP: "SP" + Number($scope.list.length) + 1,
        tenSP: $scope.tenSPAdd,
        donGia: $scope.donGiaAdd,
        soLuong: $scope.soLuongAdd,
        image: file.name,
        categoryId: $scope.categoryAdd,
      })
      .then(
        function (response) {
          console.log(response);
          if (response.status === 201) {
            alert("Thêm thành công");
            $location.path("/san-pham");
          }
        },
        function (errors) {
          console.log(errors);
        }
      );
  };
};
