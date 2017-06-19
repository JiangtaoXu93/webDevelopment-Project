(function () {
    angular
        .module('WebAppMaker')
        .controller('NewWidgetController', NewWidgetController);

    function NewWidgetController($routeParams,
                                $location,
                                 currentUser,
                                widgetService) {
        var model = this;

        model.userId = currentUser._id;
        model.pageId = $routeParams['pageId'];
        model.websiteId = $routeParams['websiteId'];
        model.widgetId = $routeParams['widgetId'];
        model.createWidget = createWidget;

        function createWidget(widgetType){
            var widget = {
                type : widgetType,
                pageId :model.pageId
            };
            widgetService.createWidget(widget)
                .then(function (data) {
                    var widgetId = data.widgets[data.widgets.length - 1];
                    $location.url('/website/' + model.websiteId + '/page/' + model.pageId + '/widget/new/' + widgetId );
                });

          //  $location.url('/user/'+model.userId+'/website/' + model.websiteId + '/page/' + model.pageId + '/widget/new/' + widgetType);



        }

    }
})();