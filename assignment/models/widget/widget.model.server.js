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
        return Widget
            .find({_page: pageId})
            .then(
                function (widgets) {
                    widget.order = widgets.length;
                    Widget.create(widget);
                    return Widget.findOne({text: "NewWidgetToFormat"});
                },
                function (error) {
                    return null;
                }
            );
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId});
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }

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
                rows: widget.rows,
                size: widget.size,
                class: widget.class,
                order: widget.order,
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

    function reorderWidget(pageId, index1, index2) {
        index1 = parseInt(index1);
        index2 = parseInt(index2);
        return Widget
            .find({_page: pageId})
            .then(
                function (widgets) {
                    for(var i in widgets) {
                        var widget = widgets[i];

                        if(index1 < index2) {
                            if(widget.order > index1 && widget.order <= index2) {
                                widget.order --;
                                widget.save();
                            } else if(widget.order === index1) {
                                widget.order = index2;
                                widget.save();
                            }
                        } else if (index1 > index2) {
                            if(widget.order >= index2 && widget.order < index1) {
                                widget.order ++;
                                widget.save();
                            } else if(widget.order === index1) {
                                widget.order = index2;
                                widget.save();
                            }
                        }
                    }
                    return Widget.find({_page: pageId});
                },
                function (error) {
                    return null;
                }
            );
    }
};