(function () {
    angular
        .module("WamApp")
        .controller("editWebsiteController", editWebsiteController);

    function editWebsiteController($routeParams, $location, websiteService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            websiteService.findWebsitesByUser(model.userId)
                .then(function (websites) {
                    model.websites = angular.copy(websites);
                    model.origWebsites = angular.copy(model.websites);
                })
            websiteService.findWebsiteById(model.userId, model.websiteId)
                .then(function (website) {
                    model.website = angular.copy(website);
                    model.origWebsite = angular.copy(model.website);
                })
        }
        init();

        function updateWebsite(website) {
            websiteService.updateWebsite(website._id, website)
                .then(function (website) {
                    angular.copy(model.website, model.origWebsite);
                    angular.copy(model.websites, model.origWebsites);
                    $location.url("/user/" + model.userId + "/website");
                })
        }

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(model.userId, websiteId)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website");
                })
        }
    }
})();