app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/trang-chu", {
      templateUrl: "../src/pages/trang-chu.html",
      controller: TrangChuController,
    })
    .when("/gioi-thieu", {
      templateUrl: "../src/pages/gioi-thieu.html",
      controller: GioiThieuController,
    })
    .when("/ve-chung-toi", {
      templateUrl: "../src/pages/ve-chung-toi.html",
      controller: VeChungToiController,
    })
    .when("/san-pham-khach-hang", {
      templateUrl: "../src/pages/san-pham-khach-hang.html",
    })
    .when("/don-hang-cua-ban", {
      templateUrl: "../src/pages/don-hang-cua-ban.html",
      controller: DonHangCuaBanController,
    })
    .when("/san-pham", {
      templateUrl: "../src/pages/san-pham.html",
      controller: SanPhamController,
    })
    .when("/don-hang", {
      templateUrl: "../src/pages/don-hang.html",
    })
    .when("/detail-sanpham/:id", {
      templateUrl: "../src/pages/detail-sanpham.html",
      controller: DetailSanphamController,
    })
    .when("/gio-hang", {
      templateUrl: "../src/pages/gio-hang.html",
      controller: GioHangController,
    })
    .when("/mua-hang", {
      templateUrl: "../src/pages/mua-hang.html",
      controller: MuaHangController,
    })
    .when("/thong-tin-ca-nhan", {
      templateUrl: "../src/pages/thong-tin-ca-nhan.html",
      controller: ThongTinCaNhanController,
    })
    .when("/chi-tiet-don-hang/:id", {
      templateUrl: "../src/pages/chi-tiet-don-hang.html",
      controller: ChiTietDonHangController,
    })
    .otherwise({
      redirectTo: "/trang-chu",
    });
});
