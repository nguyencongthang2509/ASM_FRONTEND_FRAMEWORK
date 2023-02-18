window.ThongTinCaNhanController = function (
  $scope,
  $rootScope,
  $http,
  $localStorage,
  UserService,
  UserUpdate
) {
  $rootScope.checkAuthors = true;

  $scope.userCurrent = {
    ma: "",
    hoTen: "",
    ngaySinh: "",
    image: "",
    gioiTinh: false,
    sdt: "",
    email: "",
    matKhau: "",
    vaiTro: false,
    gioHang: [],
    id: 0,
  };

  UserService.fetchUser($localStorage.id).then(function () {
    $scope.userCurrent = UserService.getUser();
  });

  document
    .querySelector("#valueImageUpdate")
    .addEventListener("input", function () {
      var formData = new FormData();
      var file = document.querySelector("#valueImageUpdate").files[0];
      formData.append("file", file);
      document.querySelector("#showImageUpdate").src =
        URL.createObjectURL(file);
    });

  $scope.updateUser = function (event) {
    event.preventDefault();
    var formData = new FormData();

    let file = document.querySelector("#valueImageUpdate").files[0];
    let fileNameUpdate = "";
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
      fileNameUpdate = $scope.userCurrent.image;
    }

    $scope.userCurrent.image = fileNameUpdate;

    UserUpdate.update(
      { id: $localStorage.id },
      $scope.userCurrent
    ).$promise.then(
      function (response) {
        alert("Cập nhật thành công");
        $location.path("/thong-tin-ca-nhan");
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
};
