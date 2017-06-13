var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('GraduateWidgetModel', widgetSchema);
var pageModel = require('../page/page.model.server');

// api
widgetModel.findAllWidgets = findAllWidgets;
widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.deleteWidget = deleteWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.reorderWidget = reorderWidget;
module.exports = widgetModel;

function deleteWidget(pageId, widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function (status) {
            return pageModel
                .deleteWidget(pageId, widgetId);
        });
}

function findAllWidgetsForPage(pageId) {
    return pageModel.findPageById(pageId)
        .then(function (page) {
            var ids = page.widgets;
            return widgetModel.find({ _id: { $in: ids } }).exec(function(err, docs) {
                docs.sort(function(a, b) {
                    // Sort docs by the order of their _id values in ids.
                    return ids.indexOf(a._id) - ids.indexOf(b._id);
                });
            });
        })


    // return widgetModel
    //     .find({_page: pageId})
    //     .populate('_page')
    //     .exec();
}

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel
        .create(widget)
        .then(function (widget) {
            return pageModel
                .addWidget(pageId, widget._id)
        })
}

function findAllWidgets() {
    return widgetModel.find();
}

function findWidgetById(widgetId){
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {$set: widget});
}

function reorderWidget(pageId, start, end) {
    return pageModel.reorderWidget(pageId, start, end);
}