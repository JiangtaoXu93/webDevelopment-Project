(function () {
    angular
        .module('WebAppMaker')
        .controller('WidgetListController', WidgetListController);

    function WidgetListController($sce,
                                  $routeParams,
                                  widgetService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.widgetUrl = widgetUrl;

        function init (){
            widgetService.findWidgetsByPageId(model.pageId)
                .then(function (found) {
                    model.widgets = found;
                    console.log(model.widgets);
                });

        }

        init();

        function widgetUrl(widget) {
            var url = 'views/widget/templates/widget-'+widget.type.toLowerCase()+'.view.client.html';
            return url;
        }

        function getYouTubeEmbedUrl(linkUrl) {
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }
        
        function trust(html) {
           // scrubbing the html
            html = html.replace(/<.*?script.*?>.*?<\/.*?script.*?>/igm, '');
            html = html.replace(/<.*?link.*?>/igm, '');

            return $sce.trustAsHtml(html);
        }
    }
})();