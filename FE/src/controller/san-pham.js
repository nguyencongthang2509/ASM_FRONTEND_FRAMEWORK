window.SanPhamController = function (
  $scope,
  $http,
  $rootScope,
  ProductService,
  CategoryService,
  $localStorage,
  ProductAdd,
  ProductUpdate
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

  $scope.findProductById = function (id) {
    return ProductService.getProducts().filter((sv) => {
      return sv.id == id;
    })[0];
  };

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
        categoryId: Number($scope.categoryAdd),
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

  let idSPUpdate = 0;

  $scope.updateAction = function (id) {
    idSPUpdate = id;
    $scope.imageUpdateModal = $scope.findProductById(id).image.toString();
    document.querySelector("#showImageUpdate").src =
      "../../server/src/main/resources/static/image/" +
      $scope.findProductById(id).image.toString();
    $scope.tenSPUpdate = $scope.findProductById(id).tenSP.toString();
    $scope.soLuongUpdate = $scope.findProductById(id).soLuong;
    $scope.donGiaUpdate = $scope.findProductById(id).donGia;
    // $scope.categoryUpdate = Number($scope.findProductById(id).categoryId);
    document.querySelector("#categoryUpdateSelected").value = Number(
      $scope.findProductById(id).categoryId
    );
  };

  document
    .querySelector("#valueImageUpdate")
    .addEventListener("input", function () {
      var formData = new FormData();
      var file = document.querySelector("#valueImageUpdate").files[0];
      formData.append("file", file);
      fileNameUpdate = file.name;
      document.querySelector("#showImageUpdate").src =
        URL.createObjectURL(file);
    });

  $scope.updateProduct = function () {
    var formData = new FormData();

    var file = document.querySelector("#valueImageUpdate").files[0];
    var fileNameUpdate = "";
    if (file != null) {
      formData.append("file", file);
      fileNameUpdate = file.name;
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
    }else{
      fileNameUpdate = $scope.findProductById(idSPUpdate).image;
    }

    $http
      .put(productsAPI + "/" + idSPUpdate, {
        maSP: $scope.findProductById(idSPUpdate).maSP,
        tenSP: $scope.tenSPUpdate,
        donGia: $scope.donGiaUpdate,
        soLuong: $scope.soLuongUpdate,
        image: fileNameUpdate,
        categoryId: Number(
          document.querySelector("#categoryUpdateSelected").value
        ),
      })
      .then(
        function (response) {
          if (response.status === 201) {
            alert("Cập nhật thành công");
            $location.path("/san-pham");
          }
        },
        function (errors) {
          console.log(errors);
        }
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
      $scope.list = listProductChecked;
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
        $scope.list = ProductService.getProducts();
      });
    } else {
      listCheckBox.forEach((item) => {
        item.checked = false;
      });
      $scope.list = [];
    }
  };
};
