(function(){
    angular
        .module("wamDirectives", [])
        .directive("wam-sortable", wamSortable);

    function wamSortable() {
        function linker(scope, element, attributes) {
            var data = scope.data;
            var startIndex = -1;
            var endIndex = -1;
            $(element)
                .find("table")
                .sortable({
                    start: function(event, ui) {
                        console.log("sorting began");
                        startIndex = ui.item.index();
                        console.log(startIndex);
                    },
                    stop: function (event, ui) {
                        console.log("sorting stopped");
                        endIndex = ui.item.index();
                        console.log(endIndex);

                        var sortedElement = scope.data.splice(startIndex, 1)[0];
                        scope.data.splice(endIndex, 0, sortedElement);
                        console.log(scope.data);

                        scope.$apply();

                        // scope.$parent.model.sorted(startIndex, endIndex);
                        scope.reorder({start: startIndex, end: endIndex});
                    }
                });
        }
        return {
            templateUrl: "myTable.html",
            scope: {
                title:  "=",
                border: "=",
                data:   "=",
                reorder: "&sorted"
            },
            link: linker
        }
    }
})();