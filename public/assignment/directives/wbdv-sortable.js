(function () {
    angular
        .module('wbdvDirectives',[])
        .directive('wdDraggable', wdDraggable);

    function wdDraggable($routeParams,widgetService) {

        function linkFunction(scope, element) {

            var initialIndex;
            var pageId = $routeParams.pageId;

            function beforeSortHandler(event, ui){
                initialIndex = $(ui.item).index();
            };

            function afterSortHandler(event, ui) {
                if (initialIndex !== null){
                    var finalIndex = $(ui.item).index();
                    widgetService.sortWidgets(initialIndex,finalIndex,pageId).then(
                        function () {
                            console.log(initialIndex + "  "+ finalIndex);
                        }
                    );


                }
            };


            $(element).sortable({
                    start: beforeSortHandler,
                    stop: afterSortHandler
            }
            );

        }

        return {
            link: linkFunction
        }
    }

})();