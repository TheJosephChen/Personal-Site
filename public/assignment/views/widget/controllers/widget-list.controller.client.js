(function () {
    angular
        .module("WamApp")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, widgetService, $sce, $location) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.temp = [];

        model.editWidget = editWidget;
        model.trustThisHTMLContent = trustThisHTMLContent;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;

        function init() {
            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                })
                .then(function () {
                    for (var w in model.widgets) {
                        widgetService
                            .findWidgetById(model.widgets[w])
                            .then(function (widget) {
                                model.temp.push(widget);
                            })
                    }
                    model.widgets = model.temp;

                })
        }
        init();

        function editWidget(widgetId) {
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + widgetId + "/edit");
        }

        function trustThisHTMLContent(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(youtubeLink) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var linkParts = youtubeLink.split('/');
            var id = linkParts[linkParts.length - 1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);
        }

    }
})();