app.service("OrderService", function ($http) {
  var orders = [];

  this.getOrders = function () {
    return orders;
  };

  this.setOrder = function (data) {
    orders = data;
  };

  this.fetchOrders = function () {
    return $http.get(orderAPI + "?_embed=orderDetails").then(
      function (response) {
        if (response.status === 200) {
          orders = response.data;
        }
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
});

app.service("OrderServiceByUser", function ($http) {
  var orders = [];

  this.getOrders = function () {
    return orders;
  };

  this.setOrders = function (data) {
    orders = data;
  };

  this.fetchOrders = function (idUser) {
    return $http.get(orderAPI).then(
      function (response) {
        var listOrders = [];
        if (response.status === 200) {
          listOrders = response.data;
        }
        for (var item of listOrders) {
          if (item.userId == idUser) {
            orders.push(item);
          }
        }
        return orders;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
});
