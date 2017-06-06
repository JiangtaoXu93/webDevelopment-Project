const app = require('../../express');

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

app.get("/api/user/:userId/website", findAllWebsitesForUser);
app.post("/api/user/:userId/website",createWebsite);
app.get ("/api/website/:websiteId", findWebsiteById);
app.put ("/api/website/:websiteId", updateWebsite);
app.delete ("/api/website/:websiteId", deleteWebsite);

function findAllWebsitesForUser(req, res) {
    var results = [];
    for(var v in websites) {
        if(websites[v].developerId === req.params.userId) {
            results.push(websites[v]);
        }
    }
    res.json(results);
}

function createWebsite(req,res) {

    var website = req.body;
    website._id = (new Date()).getTime() + "";
    websites.push(website);
    res.json(website);
}

function deleteWebsite(req,res) {

    var websiteId = req.params.websiteId;
    for(var u in websites) {
        if(websites[u]._id === websiteId) {
            websites.splice(u, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function findWebsiteById(req,res) {
    var websiteId = req.params['websiteId'];
    for(var u in websites) {
        if(websites[u]._id === websiteId) {
            res.send(websites[u]);
            return;
        }
    }
    res.sendStatus(404);

}


function updateWebsite(req, res){
    var website = req.body;
    for(var u in websites) {
        if(websites[u]._id === req.params.websiteId) {
            websites[u] = website;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}
