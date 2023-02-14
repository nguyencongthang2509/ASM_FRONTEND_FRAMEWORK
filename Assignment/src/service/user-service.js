app.service("UserService", function ($http) {
  var users = {};

  this.getUser = function () {
    return users;
  };

  this.setUser = function (data) {
    users = data;
  };

  this.fetchUser = function (idUser) {
    return $http.get(userAPI).then(
      function (response) {
        var listUsers = [];
        if (response.status === 200) {
          listUsers = response.data;
        }
        for (var item of listUsers) {
          if (item.id == idUser) {
            users = item;
            return response;
          }
        }
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
});
