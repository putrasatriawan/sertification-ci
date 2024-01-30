require(["../common"], function (common) {
  require(["main-function", "../app/app-sertifikasi"], function (
    func,
    application
  ) {
    App = $.extend(application, func);
    App.init();
  });
});
