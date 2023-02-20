app.service("AuthenticationService", [
  "$http",
  "$localStorage",
  function ($http, $localStorage) {
    var listUsers = [];

    function getListUsers() {
      return $http.get(userAPI).then(
        function (response) {
          if (response.statusText === "OK") {
            listUsers = response.data;
          }
        },
        function (errors) {
          console.log(errors);
        }
      );
    }

    function dangNhap(email, matKhau) {
      var check = false;
      for (var item of listUsers) {
        if (item.email == email && item.matKhau == matKhau) {
          $localStorage.id = item.id;
          $localStorage.vaiTro = item.vaiTro;
          check = true;
          return check;
        }
      }
      return false;
    }

    return {
      getListUsers: getListUsers,
      dangNhap: dangNhap,
    };
  },
]);
