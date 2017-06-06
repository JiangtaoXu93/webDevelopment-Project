const app = require('../../express');

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

    function getWidgetById(widgetId) {
        for(var u in widgets) {
            if(widgets[u]._id === widgetId) {
                return widgets[u];
            }
        }
        return null;
    }


    var widget = getWidgetById(widgetId);

    widget.name = originalname;
    widget.url = '/assignment/uploads/'+filename;

    var callbackUrl   = "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;

    res.redirect(callbackUrl);
}


function findAllWidgetsForPage(req, res) {
    var results = [];
    for(var v in widgets) {
        if(widgets[v].pageId === req.params.pageId) {
            results.push(widgets[v]);
        }
    }
    res.json(results);
}



function createWidget(req,res) {

    var widget = req.body;
    // widget._id = (new Date()).getTime() + "";
    widgets.push(widget);
    res.json(widget);
}

function deleteWidget(req,res) {

    var widgetId = req.params.widgetId;
    for(var u in widgets) {
        if(widgets[u]._id === widgetId) {
            widgets.splice(u, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function findWidgetById(req,res) {
    var widgetId = req.params['widgetId'];
    for(var u in widgets) {
        if(widgets[u]._id === widgetId) {
            res.send(widgets[u]);
            return;
        }
    }
    res.sendStatus(404);

}


function updateWidget(req, res){
    var widget = req.body;
    for(var u in widgets) {
        if(widgets[u]._id === req.params.widgetId) {
            widgets[u] = widget;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}


function sortWidgets(req, res){
    var index1 = req.query['initial'];
    var index2 = req.query['final'];
    var pageId = req.params.pageId;

    var initial = 0;
    var final = 0;
    var j = 0;

    for (var i = 0; i < widgets.length ; i++){
        if (widgets[i].pageId === pageId){
            if (j === parseInt(index1)){
                initial = i;
            }
            if (j === parseInt(index2)){
                final = i;
            }
            j++;
        }
    }


    Array.prototype.move = function (from, to) {
        this.splice(to, 0, this.splice(from, 1)[0]);
    };

    widgets.move(initial,final);
    res.sendStatus(200);
}


