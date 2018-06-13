(function () {
    angular
        .module("WamApp")
        .controller("newWebsiteController", newWebsiteController);

    function newWebsiteController($routeParams, $location, websiteService) {
        var model = this;
        model.createWebsite = createWebsite;

        model.userId = $routeParams.userId;
        function init() {
            websiteService.findWebsitesByUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                })
        }
        init();

        function createWebsite(userId, website) {
            websiteService
                .createWebsite(userId, website)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website");
                })
        }
    }
})();