(function () {
    angular
        .module("WamApp")
        .controller("newPageController", newPageController);

    function newPageController($routeParams, pageService, $location) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.createPage = createPage;

        function init() {
            pageService
                .findPagesByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                })
        }
        init();

        function createPage(websiteId, page) {
            pageService
                .createPage(websiteId, page)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
                })
        }
    }
})();