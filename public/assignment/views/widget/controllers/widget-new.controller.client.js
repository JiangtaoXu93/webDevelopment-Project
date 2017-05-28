(function () {
    angular
        .module('WebAppMaker')
        .controller('NewWidgetController', NewWidgetController);

    function NewWidgetController($routeParams,
                                $location,
                                widgetService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.pageId = $routeParams['pageId'];
        model.websiteId = $routeParams['websiteId'];
        model.widgetId = $routeParams['widgetId'];
        model.createWidget = createWidget;

        function createWidget(widgetType){
            var widget = {
                _id : (new Date()).getTime() + "",
                widgetType : widgetType,
                pageId :model.pageId
            };
            widgetService.createWidget(widget);
            $location.url('/user/'+model.userId+'/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id );
        }

    }
})();