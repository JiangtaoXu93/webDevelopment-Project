(function () {
    angular
        .module('WebAppMaker')
        .controller('EditWidgetController', EditWidgetController);

    function EditWidgetController($routeParams,
                                $location,
                                widgetService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.pageId = $routeParams['pageId'];
        model.websiteId = $routeParams['websiteId'];
        model.widgetId = $routeParams['widgetId'];
        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;
        model.getHeader = getHeader;
        model.widgetUrl = widgetUrl;




        function init() {
            widgetService.findWidgetById(model.widgetId)
                .then(function (found) {
                    model.widget = found;

                    if (model.widget.widgetType === "IMAGE") {
                        model.updateButton = "showButton";
                    }

                    if (model.widget.widgetType === "HEADING") {
                        if (typeof model.widget.size === 'undefined'){
                            model.widget.size = 4;
                        }
                        model.optionData = {
                            availableOptions: [
                                {id: 1, name: '1 (X-Large)'},
                                {id: 2, name: '2 (Larger)'},
                                {id: 3, name: '3 (Large)'},
                                {id: 4, name: '4 (Medium)'},
                                {id: 5, name: '5 (Small)'},
                                {id: 6, name: '6 (Smallest)'}
                            ],
                            selectedOption: {id: model.widget.size} //This sets the default value of the select in the ui
                        };
                    }

                    if (model.widget.widgetType === "YOUTUBE" || model.widget.widgetType === "IMAGE") {
                        if (typeof model.widget.width === 'undefined'){
                            model.widget.width = '100%';
                        }

                        model.optionWidthData = {
                            availableWidthOptions: [
                                {id: '200%', name: '200%'},
                                {id: '150%', name: '150%'},
                                {id: '100%', name: '100%'},
                                {id: '50%', name: '50%'},
                                {id: '25%', name: '25%'},
                            ],
                            selectedWidthOption: {id: model.widget.width} //This sets the default value of the select in the ui
                        };
                    }
                });


        }
        init();

        function deleteWidget(widgetId) {
            widgetService.deleteWidget(widgetId)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                });

        }

        function updateWidget(widgetId, widget) {
            if (typeof model.optionData !== 'undefined'){
                widget.size = model.optionData.selectedOption.id ;
            }

            if (typeof model.optionWidthData !== 'undefined'){
                widget.width = model.optionWidthData.selectedWidthOption.id;
            }


            widgetService.updateWidget(widgetId,widget)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                });

        }

        function getHeader(){
            if ( typeof model.widget !=='undefined'){
                var widgetType = model.widget.widgetType;
                var header = widgetType.slice(0,1) + widgetType.slice(1,widgetType.length).toLowerCase()+ " " + "Editor";
                return header;
            }

        }

        function widgetUrl(widget) {
            if (typeof widget !== 'undefined'){
                var url = 'views/widget/templates/widget-'+widget.widgetType.toLowerCase()+'-edit.view.client.html';
                return url;
            }

        }
    }
})();