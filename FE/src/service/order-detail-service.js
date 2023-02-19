app.service("OrderDetailService", function ($http) {
    var orderDetails = [];
  
    this.a = function () {
      return orderDetails;
    };
  
    this.setOrderDetail = function (data) {
      orderDetails = data;
    };
  
    this.fetchOrderDetails = function () {
      return $http.get(orderDetailAPI + "?_expand=order").then(
        function (response) {
          if (response.status === 200) {
            orderDetails = response.data;
          }
          return response;
        },
        function (errors) {
          console.log(errors);
        }
      );
    };
  });
  