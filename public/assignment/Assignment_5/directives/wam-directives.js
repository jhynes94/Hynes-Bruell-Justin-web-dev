(function () {
    angular.module("wamDirectives", [])
        .directive("wamSortable", wamSortable);

    function wamSortable() {
        function linker(scope, element, attributes) {
            var data = scope.data;
            var start = -1;
            var stop = -1;
            $(element)
                .find(".sortWidgets")
                .sortable({
                    start: function (event, ui) {
                        start =  ui.item.index();
                        console.log("Start");
                    },
                    stop: function (event, ui) {
                        stop = ui.item.index();
                        console.log("Stop");
                        //scope.$apply();
                        scope.$parent.model.sortList(start, stop);
                        //scope.reorder({start: start, stop: stop});
                    }
                });
        }
        return {
            templateUrl: "directives/wam-directives.html",
            scope: {
                title: "=",
                data: "=",
                reorder: "&sortList"
            },
            link: linker
        }
    }
})();