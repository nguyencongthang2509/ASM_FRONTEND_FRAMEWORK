app.controller(
  "myCtrl",
  function ($scope, $http, $rootScope, $localStorage, UserService) {
    $rootScope.username = $localStorage.username;
    $rootScope.hoTen = $localStorage.hoTen;
    $rootScope.vaiTro = $localStorage.vaiTro;
    $localStorage.checkAuthors = true;
    if ($localStorage.vaiTro) {
      $rootScope.showClient = false;
      $rootScope.showAdmin = true;
      $localStorage.checkAuthors = true;
    } else {
      $rootScope.showClient = true;
      $rootScope.showAdmin = false;
      $localStorage.checkAuthors = false;
    }

    if ($localStorage.username == null) {
      $scope.showLogin = true;
      $scope.showLogout = false;
      $localStorage.checkLocalStorage = false;
    } else {
      $scope.showLogin = false;
      $scope.showLogout = true;
      $localStorage.checkLocalStorage = true;
    }

    $scope.logOut = function () {
      $localStorage.$reset();
    };

    var listUsers = [];

    $http.get(userAPI).then(
      function (response) {
        if (response.statusText === "OK") {
          listUsers = response.data;
          $rootScope.listUsers = response.data;
        }
        for (var item of listUsers) {
          if (item.email == $localStorage.username) {
            $scope.soLuongSPGioHang = item.gioHang.length;
            $rootScope.listGioHang = item.gioHang;
          }
        }
      },
      function (errors) {
        console.log(errors);
      }
    );
  }
);
