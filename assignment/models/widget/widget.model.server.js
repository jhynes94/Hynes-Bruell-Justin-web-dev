module.exports = function() {

    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };
    return api;

    function createWidget(pageId, widget) {
        widget._page = pageId;
        return Widget.create(widget);
        //return Widget.find({text: "NewWidgetToFormat222"})[0];
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId});
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }

    //TODO Finish This!
    function updateWidget(widgetId, widget) {
        return Widget.update(
            {_id: widgetId},
            {$set :
            {
                type: widget.type,
                name: widget.name,
                text: widget.text,
                placeholder: widget.placeholder,
                description: widget.description,
                url: widget.url,
                width: widget.width,
                height: widget.height,
                //rows: Number,
                //TODO Change Size to number
                size: widget.size,
                class: widget.class,
                icon: widget.icon,
                deletable: widget.deletable,
                formatted: widget.formatted,
            }
            }
        );
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }

    //TODO
    function reorderWidget(pageId, start, end) {
        
    }
};