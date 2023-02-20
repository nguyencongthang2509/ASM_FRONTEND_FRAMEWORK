app.service("AuthorizationService", function ($localStorage) {
  this.checkAuthors = function () {
    return !$localStorage.vaiTro;
  };
});
