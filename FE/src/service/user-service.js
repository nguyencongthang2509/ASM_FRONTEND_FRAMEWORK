app.service("UserService", function ($http) {
  var user = {};

  this.getUser = function () {
    return user;
  };

  this.setUser = function (data) {
    user = data;
  };

  this.fetchUser = function (idUser) {
    return $http.get(userAPI + "/" + idUser).then(
      function (response) {
        if (response.status === 200) {
          user = response.data;
        }
        return user;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
});

app.service("UsersService", function ($http) {
  var users = {};

  this.getUsers = function () {
    return users;
  };

  this.setUsers = function (data) {
    users = data;
  };

  this.fetchUsers = function () {
    return $http.get(userAPI).then(
      function (response) {
        if (response.status === 200) {
          users = response.data;
        }
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
});
