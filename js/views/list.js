app.views.list = Backbone.View.extend({
    mode: null,
    events: {},
    initialize: function () {
        var handler = _.bind(this.render, this);
        this.model.bind("change", handler);
        this.model.bind("add", handler);
        this.model.bind("remove", handler);

    },
    render: function () {},
    priorityUp: function (e) {},
    priorityDown: function (e) {},
    archive: function (e) {},
    changeStatus: function (e) {},
    setMode: function (mode) {
        this.mode = mode;
        return this;
    }
});