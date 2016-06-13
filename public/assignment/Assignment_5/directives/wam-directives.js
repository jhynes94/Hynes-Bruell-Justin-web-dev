(function () {
    angular.module("wamDirectives", [])
        .directive("wamSortable", wamSortable);

    function wamSortable() {
        function linker(scope, element, attributes) {
            var start = -1;
            var stop = -1;
            $(element)
                .find(".sortWidgets")
                .sortable({
                    axis: 'y',
                    placeholder: "ui-state-highlight",
                    handle: '.fa-bars',
                    start: function (event, ui) {
                        start =  ui.item.index();
                        console.log("Start");
                    },
                    stop: function (event, ui) {
                        stop = ui.item.index();
                        console.log("Stop");
                        scope.$parent.model.sortList(start, stop);
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