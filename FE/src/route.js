app.config(function ($routeProvider, $locationProvider) {
  // $routeProvider : Chuyển trang
  //   Xóa khoảng trắng trên đường dẫn

  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/trang-chu", {
      templateUrl: "../src/pages/trangchu.html",
      controller: TrangChuController,
    })
    .when("/gioi-thieu", {
      templateUrl: "../src/pages/gioithieu.html",
      controller: GioiThieuController,
    })
    .when("/ve-chung-toi", {
      templateUrl: "../src/pages/vechungtoi.html",
      controller: VeChungToiController
    })
    .when("/san-pham", {
      templateUrl: "../src/pages/sanpham.html",
      controller: SanPhamController,
    })
    .when("/don-hang", {
      templateUrl: "../src/pages/donhang.html",
    })
    .when("/detail-sanpham/:id", {
      templateUrl: "../src/pages/detail-sanpham.html",
      controller: DetailSanphamController,
    })
    .when("/gio-hang", {
      templateUrl: "../src/pages/giohang.html",
      controller: GioHangController,
    })
    .when("/don-hang-da-mua", {
      templateUrl: "../src/pages/donhangdamua.html",
    })
    .otherwise({
      redirectTo: "/trang-chu",
    });
});

