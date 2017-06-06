(function () {
    angular
        .module('WebAppMaker')
        .service('widgetService', widgetService);
    
    function widgetService($http) {
        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.deleteWidget = deleteWidget;
        this.createWidget = createWidget;
        this.updateWidget = updateWidget;
        this.sortWidgets =sortWidgets;



        function createWidget(widget) {
            // widgets.push(widget);

            var url = "/api/page/"+ widget.pageId+"/widget";
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWidget(widgetId) {
            // var widget = findWidgetById(widgetId);
            // var index = widgets.indexOf(widget);
            // widgets.splice(index, 1);

            var url = "/api/widget/"+widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function findWidgetById(widgetId) {
            // return widgets.find(function (widget) {
            //     return widget._id === widgetId;
            // });

            var url = "/api/widget/"+widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetsByPageId(pageId) {
            // var results = [];
            //
            // for(var v in widgets) {
            //     if(widgets[v].pageId === pageId) {
            //         results.push(widgets[v]);
            //     }
            // }
            //
            // return results;

            var url =  "/api/page/"+pageId+"/widget";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWidget(widgetId, widget){
            // var oldWidget = findWidgetById(widgetId);
            // var oldIndex = widgets.indexOf(oldWidget);
            // widgets[oldIndex] = widget;

            var url = "/api/widget/"+widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function sortWidgets(index1, index2,pageId){
            var url = "/api/page/" + pageId +"/widget?initial=" + index1 + "&final=" + index2;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });

        }

    }
})();