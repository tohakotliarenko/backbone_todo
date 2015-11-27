window.app.views.menu = Backbone.View.extend({
    template: _.template('<ul><li><a href="#">List</a></li><li><a href="#archive">Archive</a></li><li class="right"><a href="#new">+</a></li></ul>'),
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.html(this.template({}));
    }
});