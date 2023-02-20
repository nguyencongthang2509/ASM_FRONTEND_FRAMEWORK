app.controller(
  "myCtrl",
  function (
    $scope,
    $localStorage,
    UserService,
    UsersService,
    OrderServiceByUser,
    $location
  ) {
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

    OrderServiceByUser.fetchOrders($localStorage.id).then(function () {
      let listOrders = OrderServiceByUser.getOrders();
      let count = 0;
      for (let item of listOrders) {
        if (item.trangThai != 3) {
          count++;
        }
      }
      $scope.soLuongDonHang = count;
    });

    if ($location.path() == "/trang-chu") {
      $scope.activeMenu = 0;
    } else if ($location.path() == "/san-pham-khach-hang") {
      $scope.activeMenu = 1;
    } else if ($location.path() == "/gioi-thieu") {
      $scope.activeMenu = 2;
    } else if ($location.path() == "/ve-chung-toi") {
      $scope.activeMenu = 3;
    } else if ($location.path() == "/san-pham") {
      $scope.activeMenu = 4;
    } else if ($location.path() == "/don-hang") {
      $scope.activeMenu = 5;
    }

    $scope.actionMenu = function (trangThai) {
      $scope.activeMenu = trangThai;
    };
  }
);
