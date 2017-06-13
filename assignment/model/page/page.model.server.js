var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('GraduatePageModel', pageSchema);
var websiteModel = require('../website/website.model.server');

// api
pageModel.findAllPages = findAllPages;
pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.deletePage = deletePage;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;

pageModel.addWidget = addWidget;
pageModel.deleteWidget = deleteWidget;
pageModel.reorderWidget = reorderWidget;

module.exports = pageModel;

function deletePage(websiteId, pageId) {
    return pageModel
        .remove({_id: pageId})
        .then(function (status) {
            return websiteModel
                .deletePage(websiteId, pageId);
        });
}

function findAllPagesForWebsite(websiteId) {
    return pageModel
        .find({_website: websiteId})
        .populate('_website')
        .exec();
}

function createPage(websiteId, page) {
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function (page) {
            return websiteModel
                .addPage(websiteId, page._id);
        })
}

function findAllPages() {
    return pageModel.find();
}

function findPageById(pageId){
    return pageModel.findById(pageId);
}

function updatePage(pageId, page) {
    return pageModel.update({_id: pageId}, {$set: page});
}

function deleteWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
<<<<<<< HEAD
            var index = page.widgets.indexOf(widgetId);
=======
            var index = page.widgets.indexOf(pageId);
>>>>>>> origin/master
            page.widgets.splice(index, 1);
            return page.save();
        });
}

function addWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        });
}

function reorderWidget(pageId, start, end) {
    var j = 0;
    // console.log(pageId);
    return pageModel
        .findById(pageId)
        .then(function (page) {
            Array.prototype.move = function (from, to) {
                this.splice(to, 0, this.splice(from, 1)[0]);
            };
            // console.log("1st: " + page.widgets);
            page.widgets.move(start,end);
            // console.log("2nd: " +page.widgets);
            return page.save();
        });



}