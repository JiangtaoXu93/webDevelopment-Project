(function () {
    angular
        .module('WebAppMaker')
        .controller('ImageSearchController', ImageSearchController);

    function ImageSearchController($routeParams,
                                 $location,
                                   FlickrService,
                                   widgetService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.pageId = $routeParams['pageId'];
        model.websiteId = $routeParams['websiteId'];
        model.widgetId = $routeParams['widgetId'];
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;


        function selectPhoto(photo){
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            widgetService.findWidgetById(model.widgetId)
                .then(function (widget) {
                    widget.url = url;
                    widgetService
                        .updateWidget(model.websiteId,widget)
                        .then(function () {
                            cancelEdit(model.widgetId);
                        });
                })
            
        }

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    console.log(response);
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    console.log(data);
                    model.photos = data.photos;
                });
        }

        function cancelEdit(widgetId){
            var url = $location.url();
            var link = url.split('/');
            var version = link[link.length - 3];
            if (version === 'new'){
                $location.url('/user/'+model.userId+'/website/' + model.websiteId + '/page/' + model.pageId + '/widget/new/'
            + widgetId);
            }else{
                $location.url('/user/'+model.userId+'/website/' + model.websiteId + '/page/' + model.pageId + '/widget/'
                    + widgetId);
            }

        }


    }
})();
