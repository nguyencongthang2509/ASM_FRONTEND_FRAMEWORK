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

app.service("getOneProductService", function ($http) {
  var product = {};

  this.getProduct = function () {
    return product;
  };

  this.setProduct = function (data) {
    product = data;
  };

  this.fetchProduct = function (idSP) {
    return $http.get(productsAPI + "/" + idSP + "?_expand=category").then(
      function (response) {
        var listProducts = [];
        if (response.status === 200) {
          listProducts = response.data;
        }
        for (var item of listProducts) {
          if (item.id == idSP) {
            product = item;
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
