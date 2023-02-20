window.SanPhamController = function (
  $scope,
  $http,
  $rootScope,
  ProductService,
  CategoryService,
  ProductAdd,
  ProductUpdate,
  AuthorizationService
) {
  $rootScope.checkAuthors = !AuthorizationService.checkAuthors();

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
  $scope.moTaAdd = "";
  $scope.categoryAdd = "1";

  $scope.addProduct = function (event) {
    event.preventDefault();
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
          // Thành công rồi haha
        },
        function (error) {
          // Thất bại rồi xem lại code đi
        }
      );

    let maSP = Number($scope.list.length) + 1;

    ProductAdd.create({
      maSP: "SP" + maSP,
      tenSP: $scope.tenSPAdd,
      donGia: $scope.donGiaAdd,
      soLuong: $scope.soLuongAdd,
      image: file.name,
      soLuongBan: 0,
      ngayTao: new Date().getTime(),
      moTa: $scope.moTaAdd,
      categoryId: Number($scope.categoryAdd),
    }).$promise.then(
      function (response) {
        alert("Thêm thành công");
      },
      function (error) {}
    );
  };

  let idSPUpdate = 0;

  $scope.updateAction = function (event, id) {
    event.preventDefault();
    idSPUpdate = id;
    $scope.imageUpdateModal = $scope.findProductById(id).image.toString();
    document.querySelector("#showImageUpdate").src =
      "../../server/src/main/resources/static/image/" +
      $scope.findProductById(id).image.toString();
    $scope.tenSPUpdate = $scope.findProductById(id).tenSP.toString();
    $scope.soLuongUpdate = $scope.findProductById(id).soLuong;
    $scope.moTaUpdate = $scope.findProductById(id).moTa;
    $scope.donGiaUpdate = $scope.findProductById(id).donGia;
    $scope.soLuongBanUpdate = $scope.findProductById(id).soLuongBan;
    $scope.ngayTaoUpdate = $scope.findProductById(id).ngayTao;
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
      document.querySelector("#showImageUpdate").src =
        URL.createObjectURL(file);
    });

  $scope.updateProduct = function (event) {
    event.preventDefault();
    var formData = new FormData();

    var file = document.querySelector("#valueImageUpdate").files[0];
    var fileNameUpdate = "";

    console.log(file);

    if (file != null) {
      formData.append("file", file);
      fileNameUpdate = file.name;
      $http
        .post("http://localhost:8080/dowload", formData, {
          transformRequest: angular.identity,
          headers: { "Content-Type": undefined },
        })
        .then(
          function (response) {},
          function (error) {}
        );
    } else {
      fileNameUpdate = $scope.findProductById(idSPUpdate).image;
    }

    ProductUpdate.update(
      { id: idSPUpdate },
      {
        maSP: $scope.findProductById(idSPUpdate).maSP,
        tenSP: $scope.tenSPUpdate,
        donGia: $scope.donGiaUpdate,
        soLuong: $scope.soLuongUpdate,
        moTa: $scope.moTaUpdate,
        ngayTao: $scope.ngayTaoUpdate,
        soLuongBan: $scope.soLuongBanUpdate,
        image: fileNameUpdate,
        categoryId: Number(
          document.querySelector("#categoryUpdateSelected").value
        ),
      }
    ).$promise.then(
      function (response) {
        alert("Cập nhật thành công");
        $location.path("/san-pham");
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

  $scope.currentPage = 1;
  $scope.itemsPerPage = 5;

  $scope.totalPages = function () {
    return Math.ceil($scope.list.length / $scope.itemsPerPage);
  };

  $scope.genArray = function (n) {
    let array = [];
    for (let i = 1; i <= n; i++) {
      array.push(i);
    }
    return array;
  };

  $scope.setCurrentPage = function (page) {
    $scope.currentPage = page;
  };

  $scope.searchAction = function () {
    $scope.totalPages = function () {
      return Math.ceil($scope.filtered.length / $scope.itemsPerPage);
    };
  };
};
