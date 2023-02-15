app.controller(
  "myCtrl",
  function ($scope, $http, $localStorage) {
    $scope.username = $localStorage.username;
    $scope.hoTen = $localStorage.hoTen;
    $scope.vaiTro = $localStorage.vaiTro;
    $localStorage.checkAuthors = true;
    
    if ($localStorage.vaiTro) {
      $scope.showClient = false;
      $scope.showAdmin = true;
      $localStorage.checkAuthors = true;
    } else {
      $scope.showClient = true;
      $scope.showAdmin = false;
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
          $scope.listUsers = response.data;
        }
        for (var item of listUsers) {
          if (item.email == $localStorage.username) {
            $scope.soLuongSPGioHang = item.gioHang.length;
            $scope.listGioHang = item.gioHang;
          }
        }
      },
      function (errors) {
        console.log(errors);
      }
    );
  }
);
