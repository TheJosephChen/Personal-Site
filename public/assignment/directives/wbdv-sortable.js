(function () {
    angular
        .module("myDirective", [])
        .directive("itemList", itemListDirective)
        .directive("getPage", getPageDirective);

    function itemListDirective($http) {
        function linkFunction(scope, element, attrs) {

            var sortableDiv = element.find("sortableDiv");
            var startIndex = -1;
            var endIndex = -1;
            var pageId = scope.page;

            sortableDiv.sortable({
                start: function (event, ui) {
                    startIndex = $(ui.item).index();
                },
                stop: function (event, ui) {
                    endIndex = $(ui.item).index();
                    $http.put("/api/page/" + pageId + "/widget?initial=" + startIndex + "&final=" + endIndex);
                }
            });
        }
        return {
            templateUrl: "views/widget/templates/widget-list.html",
            link: linkFunction
        }
    }

    function getPageDirective() {
        function linkFunction(scope, element, attributes) {
            scope.page = attributes["getPage"];
        }
        return {
            link: linkFunction
        }
    }

})();