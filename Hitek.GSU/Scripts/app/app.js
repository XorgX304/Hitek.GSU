﻿var GSU = new Marionette.Application();

GSU.addRegions({
    mainRegion: "#main-region",
    modal: "#modal-window-region"

});


GSU.navigate = function (route, options) {
    options || (options = {});
    Backbone.history.navigate(route, options);
};


GSU.getCurrentRoute = function () {
    return Backbone.history.fragment
};
GSU.closeModal = function () {
    GSU.modal.reset()
};

GSU.on("modalWindow:close", function (param) {
    GSU.closeModal();
});
/*
GSU.addInitializer(function () {
   // console.log("Запуск инициализации");

        if (this.getCurrentRoute() === "") {
            GSU.trigger("about:show");
        }
    
});
*/
GSU.message = function(msg, type){
    alert(msg);
};

GSU.cache = {};

GSU.on("start", function (options) {
    if (Backbone.history) {
        Backbone.history.start();
    }
    if (this.getCurrentRoute() === "") {
        GSU.trigger("Main:show");
    }
});

GSU.addInitializer(function (options) {

    console.log("Запуск инициализации");

    //GSU.cache.personel = new GSU.Common.CachePersonel();
    //GSU.cache.personel.fetch();

});


$(function () {
    GSU.start();


})