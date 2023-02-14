app.service("ProductService", function ($http) {
  var products = [];

  this.getProducts = function () {
    return products;
  };

  this.setProduct = function (data) {
    products = data;
  };

  this.fetchProducts = function () {
    return $http.get(productsAPI + "?_expand=category").then(
      function (response) {
        if (response.status === 200) {
          products = response.data;
        }
        return response;
      },
      function (errors) {
        console.log(errors);
      }
    );
  };
});
