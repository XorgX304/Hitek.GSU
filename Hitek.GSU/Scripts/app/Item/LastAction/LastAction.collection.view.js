﻿GSU.module("Item.LastAction.collection", function (Collection, GSU, Backbone, Marionette, $, _) {



    Collection._itemCollectionView = Backbone.Marionette.ItemView.extend({
        template: "lastPresentMedal",
        events: {
            "click": "click"
        },
        click: function () {
           // GSU.trigger("userInfo:show", this.model.get("id"));
        }

    });

    Collection.view = Backbone.Marionette.CollectionView.extend({
        childView: Collection._itemCollectionView,
        tagName: "div",
        initialize: function () {
            this.collection = new Collection.collection();
            this.collection.fetch();
        }
    });



});