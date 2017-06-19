const app = require('../../express');
var pageModel = require('../model/page/page.model.server');

app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
app.post("/api/website/:websiteId/page",createPage);
app.get ("/api/page/:pageId", findPageById);
app.put ("/api/page/:pageId", updatePage);
app.delete ("/api/page/:pageId", deletePage);

function findAllPagesForWebsite(req, res) {
    pageModel
        .findAllPagesForWebsite(req.params.websiteId)
        .then(function (pages) {
            res.json(pages);
        })
}

function createPage(req,res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            res.json(page);
        });
}

function deletePage(req,res) {
    var pageId = req.params.pageId;
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            pageModel
                .deletePage(page._website, pageId)
                .then(function (status) {
                    res.json(status);
                });
        })
}

function findPageById(req,res) {
    var pageId = req.params['pageId'];

    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);
        })

}


function updatePage(req, res){
    var page = req.body;

    pageModel.updatePage(page._id,page)
        .then(function (status) {
            res.send(status);
        });
}
