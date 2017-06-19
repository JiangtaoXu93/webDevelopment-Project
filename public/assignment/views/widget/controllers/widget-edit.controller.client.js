(function () {
    angular
        .module('WebAppMaker')
        .controller('EditWidgetController', EditWidgetController);

    function EditWidgetController($routeParams,
                                $location,
                                  currentUser,
                                  $timeout,
                                widgetService) {
        var model = this;

        model.userId = currentUser._id;
        model.pageId = $routeParams['pageId'];
        model.websiteId = $routeParams['websiteId'];
        model.widgetId = $routeParams['widgetId'];
        model.type = $routeParams['type'];


        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;
        model.getHeader = getHeader;
        model.widgetUrl = widgetUrl;
        model.cancelEdit = cancelEdit;
        model.searchWidget = searchWidget;




        function init() {
            if (typeof model.type !== 'undefined'){
                var widget = {
                    pageId: model.pageId,
                    type : model.type
                };
                model.widget = widget;

                showElement();

            }else{
                widgetService.findWidgetById(model.widgetId)
                    .then(function (found) {
                        model.widget = found;

                        showElement();
                    });

            }


        }
        init();

        function deleteWidget(widgetId) {
            widgetService.deleteWidget(widgetId)
                .then(function () {
                    $location.url('/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                });

        }

        function updateWidget(widgetId, widget) {
            if(widget.name === null  || widget.name === '' ||typeof widget.name === 'undefined'){
                model.error = "name should not be empty";

                $timeout(function () {

                    model.error = false;

                }, 3000)
            }else{

                if (typeof model.optionData !== 'undefined'){
                    widget.size = model.optionData.selectedOption.id ;
                }

                if (typeof model.optionWidthData !== 'undefined'){
                    widget.width = model.optionWidthData.selectedWidthOption.id;
                }

                if (typeof widgetId ==='undefined'){

                    widgetService.createWidget(widget)
                        .then(function () {
                            $location.url('/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                        });
                }else{
                    widgetService.updateWidget(widgetId,widget)
                        .then(function () {
                            $location.url('/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                        });
                }



            }




        }

        function getHeader(){
            if ( typeof model.widget !=='undefined'){
                var type = model.widget.type;
                var header = type.slice(0,1) + type.slice(1,type.length).toLowerCase()+ " " + "Editor";
                return header;
            }

        }

        function widgetUrl(widget) {
            if (typeof widget !== 'undefined'){
                var url = 'views/widget/templates/widget-'+widget.type.toLowerCase()+'-edit.view.client.html';
                return url;
            }

        }

        function cancelEdit(widgetId){
            var url = $location.url();
            var link = url.split('/');
            var version = link[link.length - 2];
            if (version === 'new'){
                widgetService.deleteWidget(widgetId)
                    .then(function () {})
            }
            $location.url('/website/' + model.websiteId + '/page/' + model.pageId + '/widget');

        }

        function searchWidget(widgetId){
            var oldUrl = $location.url();

            $location.url(oldUrl + '/search')
        }


        function showElement(){
            if (model.widget.type === "IMAGE") {
                model.updateButton = "showButton";
            }

            if (model.widget.type === "HEADING") {
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

            if (model.widget.type === "YOUTUBE" || model.widget.type === "IMAGE") {
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
        }
    }
})();