var app = angular.module("myModuleDangNhap", ["ngRoute", "ngStorage"]);

app.controller(
  "myCtrl",
  function ($scope, $http, $localStorage, $window, AuthenticationService) {
    var listUsers = [];

    $scope.email = "";
    $scope.matKhau = "";

    $scope.checkOut = false;

    if ($localStorage.checkLocalStorage) {
      $window.history.back();
    } else {
      $scope.checkOut = true;
    }

    AuthenticationService.getListUsers();

    $scope.dangNhap = function (event) {
      event.preventDefault();
      if (AuthenticationService.dangNhap($scope.email, $scope.matKhau)) {
        $scope.email = "";
        $scope.matKhau = "";
        window.open("../src/index.html", "_self");
      } else {
        alert("Tài khoản hoặc mật khẩu không chính xác");
      }
    };
  }
);
