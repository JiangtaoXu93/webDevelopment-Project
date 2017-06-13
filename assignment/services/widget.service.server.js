const app = require('../../express');
var widgetModel = require('../model/widget/widget.model.server');

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
app.post("/api/page/:pageId/widget",createWidget);
app.put("/api/page/:pageId/widget",sortWidgets);
app.get ("/api/widget/:widgetId", findWidgetById);
app.put ("/api/widget/:widgetId", updateWidget);
app.delete ("/api/widget/:widgetId", deleteWidget);
app.post ("/api/upload", upload.single('myFile'), uploadImage);


function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;


    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    // function getWidgetById(widgetId) {
    //     for(var u in widgets) {
    //         if(widgets[u]._id === widgetId) {
    //             return widgets[u];
    //         }
    //     }
    //     return null;
    // }
    //
    //
    // var widget = getWidgetById(widgetId);
    var widget = {};

    widgetModel.findWidgetById(widgetId)
        .then(function (widget) {
            widget.name = originalname;
            widget.url = '/assignment/uploads/'+filename;

            widgetModel.updateWidget(widgetId,widget).then(function () {
                var callbackUrl   = "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/new/"+ widgetId;
                res.redirect(callbackUrl);
            })


        });



}


function findAllWidgetsForPage(req, res) {

    widgetModel
        .findAllWidgetsForPage(req.params.pageId)
        .then(function (widgets) {
            res.json(widgets);
        });

}



function createWidget(req,res) {
    var widget = req.body;
    widgetModel
        .createWidget(widget.pageId,widget)
        .then(function (widget) {
            res.json(widget);
        });

}

function deleteWidget(req,res) {

    var widgetId = req.params.widgetId;

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            widgetModel.deleteWidget(widget._page,widgetId)
                .then(function (status) {
                    res.json(status);
                });
        });


}

function findWidgetById(req,res) {
    var widgetId = req.params['widgetId'];

    widgetModel.findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        });

}


function updateWidget(req, res){
    var widget = req.body;
    widgetModel.updateWidget(widget._id,widget)
        .then(function (status) {
            res.send(status);
        });


}


function sortWidgets(req, res){
    var index1 = req.query['initial'];
    var index2 = req.query['final'];
    var pageId = req.params.pageId;
    widgetModel.reorderWidget(pageId,index1,index2)
        .then(function (status) {
            res.send(status);
        })

    // var initial = 0;
    // var final = 0;
    // var j = 0;
    //
    // for (var i = 0; i < widgets.length ; i++){
    //     if (widgets[i].pageId === pageId){
    //         if (j === parseInt(index1)){
    //             initial = i;
    //         }
    //         if (j === parseInt(index2)){
    //             final = i;
    //         }
    //         j++;
    //     }
    // }
    //
    //
    // Array.prototype.move = function (from, to) {
    //     this.splice(to, 0, this.splice(from, 1)[0]);
    // };
    //
    // widgets.move(initial,final);
    // res.sendStatus(200);
}


