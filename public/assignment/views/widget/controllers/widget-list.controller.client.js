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
        model.widgets = widgetService.findWidgetsByPageId(model.pageId);
        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.widgetUrl = widgetUrl;

        function widgetUrl(widget) {
            var url = 'views/widget/templates/widget-'+widget.widgetType.toLowerCase()+'.view.client.html';
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
           //  var tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';
           //      tagOrComment = new RegExp(
           //          '<(?:' +
           //          // Comment body.
           //          '!--(?:(?:-*[^->])*--+|-?)' +
           //          // Special "raw text" elements whose content should be elided.
           //          '|script\\b' + '>[\\s\\S]*?</script\\s*' +
           //          '|style\\b' + '>[\\s\\S]*?</style\\s*' +
           //          // Regular name
           //          '|/?[a-z]' +
           //
           //          ')>', 'gi'
           //      );
           //  html = html.replace(tagOrComment, '');

            console.log(html);
            return $sce.trustAsHtml(html);
        }
    }
})();