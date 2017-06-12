const app = require('../../express');
var websiteModel = require('../model/website/website.model.server');

app.get("/api/user/:userId/website", findAllWebsitesForUser);
app.post("/api/user/:userId/website",createWebsite);
app.get ("/api/website/:websiteId", findWebsiteById);
app.put ("/api/website/:websiteId", updateWebsite);
app.delete ("/api/website/:websiteId", deleteWebsite);

function findAllWebsitesForUser(req, res) {
    websiteModel
        .findAllWebsitesForUser(req.params.userId)
        .then(function (websites) {
            res.json(websites);
        });
}

function createWebsite(req,res) {
    var website = req.body;
    var userId = req.params.userId;
    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website) {
            res.json(website);
        });
}

function deleteWebsite(req,res) {

    var websiteId = req.params.websiteId;
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            websiteModel
                .deleteWebsite(website._user, websiteId)
                .then(function (status) {
                    res.json(status);
                });
        });


}

function findWebsiteById(req,res) {
    var websiteId = req.params['websiteId'];

    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.json(website);
        });

}


function updateWebsite(req, res){
    var website = req.body;

    websiteModel.updateWebsite(website._id,website)
        .then(function (status) {
            res.send(status);
        });

}
