(function () {
    angular
        .module("WamApp")
        .controller("newWidgetController", newWidgetController);

    function newWidgetController($routeParams, widgetService, $location) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.createWidget = createWidget;

        function init() {
            model.widget = {};
        }
        init();

        function createWidget(pageId, widgetType) {
            model.widget.type = widgetType;
            widgetService
                .createWidget(pageId, model.widget)
                .then(function (widget) {
                    model.widgetId = widget._id
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + model.widgetId + "/edit");
                })
        }
    }
})();