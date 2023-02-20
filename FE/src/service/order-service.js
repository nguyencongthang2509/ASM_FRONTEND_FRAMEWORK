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
    return $http.get(orderAPI + "?userId=" + idUser).then(
      function (response) {
        orders = [];
        if (response.status === 200) {
          orders = response.data;
        }
        return orders;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
});

app.service("OrderServiceById", function ($http) {
  var order = {};

  this.getOrder = function () {
    return order;
  };

  this.setOrder = function (data) {
    order = data;
  };

  this.fetchOrder = function (orderId) {
    return $http.get(orderAPI + "/" + orderId + "?_embed=orderDetails").then(
      function (response) {
        if (response.status === 200) {
          order = response.data;
        }
        return order;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
});

app.service("OrderServiceByOrderId", function ($http) {
  var order = {};

  this.getOrder = function () {
    return order;
  };

  this.setOrder = function (data) {
    order = data;
  };

  this.fetchOrder = function (orderId) {
    return $http.get(orderAPI + "/" + orderId).then(
      function (response) {
        if (response.status === 200) {
          order = response.data;
        }
        return order;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
});
