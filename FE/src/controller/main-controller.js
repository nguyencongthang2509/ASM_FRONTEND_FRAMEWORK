app.controller(
  "myCtrl",
  function ($scope, $localStorage, UserService, UsersService) {
    let userCurrent = {};

    $localStorage.checkAuthors = true;

    UserService.fetchUser($localStorage.id).then(function () {
      userCurrent = UserService.getUser();
      $scope.username = userCurrent.email;
      $scope.hoTen = userCurrent.hoTen;
      $scope.vaiTro = userCurrent.vaiTro;
      $scope.avatar = userCurrent.image;

      if (userCurrent.vaiTro) {
        $scope.showClient = false;
        $scope.showAdmin = true;
        $localStorage.checkAuthors = true;
      } else {
        $scope.showClient = true;
        $scope.showAdmin = false;
        $localStorage.checkAuthors = false;
      }

      if (userCurrent.email == null) {
        $scope.showLogin = true;
        $scope.showLogout = false;
        $localStorage.checkLocalStorage = false;
      } else {
        $scope.showLogin = false;
        $scope.showLogout = true;
        $localStorage.checkLocalStorage = true;
      }
    });

    $scope.logOut = function () {
      $localStorage.$reset();
    };

    var listUsers = [];

    UsersService.fetchUsers().then(function () {
      $scope.listUsers = UsersService.getUsers();
      listUsers = UsersService.getUsers();
      for (var item of listUsers) {
        if (item.id == $localStorage.id) {
          $scope.soLuongSPGioHang = item.gioHang.length;
          $scope.listGioHang = item.gioHang;
        }
      }
    });
  }
);
