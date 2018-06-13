(function () {
    angular
        .module("WamApp")
        .controller("editPageController", editPageController);

    function editPageController($routeParams, pageService, $location) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            pageService.findPagesByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = angular.copy(pages);
                    model.origPages = angular.copy(model.pages);
                })
            pageService.findPageById(model.pageId)
                .then(function (page) {
                    model.page = angular.copy(page);
                    model.origPage = angular.copy(model.page);
                })
        }
        init();

        function updatePage(page) {
            pageService.updatePage(page._id, page)
                .then(function (page) {
                    angular.copy(model.page, model.origPage);
                    angular.copy(model.pages, model.origPages);
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
                })
        }

        function deletePage(pageId) {
            pageService.deletePage(model.websiteId, pageId)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
                })
        }
    }
})();