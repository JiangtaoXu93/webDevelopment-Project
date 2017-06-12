(function () {
    angular
        .module('WebAppMaker')
        .service('FlickrService', FlickrService);

    function FlickrService($http) {
        this.searchPhotos = searchPhotos;

        var key = "b73e515ba671d4ef477dc77594715a57";
        var secret = "60173a5f73000084";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search"
            +"&format=json&api_key=API_KEY&text=TEXT";


            function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url).then(function (data) {
                return data;
            });
        }


    }
})();
