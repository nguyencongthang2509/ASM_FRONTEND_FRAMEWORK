var app = angular.module("myModuleDangNhap", ["ngRoute", "ngStorage"]);

app.controller("myCtrl", function ($scope, $http, $localStorage, $window) {
  var listUsers = [];

  $scope.email = "";
  $scope.matKhau = "";

  $scope.checkOut = false;

  if ($localStorage.checkLocalStorage) {
    $window.history.back();
  } else {
    $scope.checkOut = true;
  }

  $http.get(userAPI).then(
    function (response) {
      if (response.statusText === "OK") {
        listUsers = response.data;
      }
    },
    function (errors) {
      console.log(errors);
    }
  );

  $scope.dangNhap = function () {
    var check = false;
    for (var item of listUsers) {
      if (item.email == $scope.email && item.matKhau == $scope.matKhau) {
        $localStorage.id = item.id;
        $localStorage.username = item.email;
        $localStorage.hoTen = item.hoTen;
        $localStorage.vaiTro = item.vaiTro;
        // local: 5MB tắt máy đi ko mất
        // cookie: 4KB mất trong 30' đến 1 tiếng
        $scope.email = "";
        $scope.matKhau = "";
        check = true;
        window.open("../src/index.html", "_self");
      }
    }
    if (!check) {
      alert("Tài khoản hoặc mật khẩu không chính xác");
    }
  };
});
