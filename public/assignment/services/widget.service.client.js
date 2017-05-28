(function () {
    angular
        .module('WebAppMaker')
        .service('widgetService', widgetService);
    
    function widgetService() {
        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.deleteWidget = deleteWidget;
        this.createWidget = createWidget;
        this.updateWidget = updateWidget;

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        function createWidget(widget) {
            widgets.push(widget);
        }

        function deleteWidget(widgetId) {
            var widget = findWidgetById(widgetId);
            var index = widgets.indexOf(widget);
            widgets.splice(index, 1);
        }
        
        function findWidgetById(widgetId) {
            return widgets.find(function (widget) {
                return widget._id === widgetId;
            });
        }

        function findWidgetsByPageId(pageId) {
            var results = [];

            for(var v in widgets) {
                if(widgets[v].pageId === pageId) {
                    results.push(widgets[v]);
                }
            }

            return results;
        }

        function updateWidget(widgetId, widget){
            var oldWidget = findWidgetById(widgetId);
            var oldIndex = widgets.indexOf(oldWidget);
            widgets[oldIndex] = widget;
        }
    }
})();