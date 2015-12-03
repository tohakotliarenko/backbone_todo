define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    var MenuList = Backbone.View.extend({
        template: _.template('<ul><li><a href="#">List</a></li><li><a href="#archive">Archive</a></li><li class="right"><a href="#new">+</a></li></ul>'),
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template({}));
        }
    });

    return MenuList;
});
