require(["../common"], function (common) {
  require(["main-function", "../app/app-peserta"], function (
    func,
    application
  ) {
    App = $.extend(application, func);
    App.init();
  });
});
