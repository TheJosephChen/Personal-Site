(function () {
    angular
        .module("WamApp")
        .controller("editWidgetController", editWidgetController);

    function editWidgetController($routeParams, widgetService, $location) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        model.unCreate = unCreate;
        model.updateWidget = updateWidget;

        function init() {
            widgetService
                .findWidgetById(model.widgetId)
                .then(function (widget) {
                    model.widget = widget;
                })
        }
        init();

        function unCreate() {
            widgetService
                .deleteWidget(model.pageId, model.widgetId)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
                })
        }

        function updateWidget(widget) {
            widgetService
                .updateWidget(widget._id, widget)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
                })
        }


    }
})();