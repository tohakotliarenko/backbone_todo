define([
    'jquery',
    'underscore',
    'backbone',
    'app/collections/toDos'
], function($, _, Backbone, TodosCollection){
    var ListView = Backbone.View.extend({
        mode: null,
        events: {
            'click a[data-up]': 'priorityUp',
            'click a[data-down]': 'priorityDown',
            'click a[data-archive]': 'archive',
            'click input[data-status]': 'changeStatus'
        },
        initialize: function () {
            //var handler = _.bind(this.render, this);
            //App.todos.on("change", handler);
            //App.todos.on("add", handler);
            //App.todos.on("remove", handler);

        },
        render: function () {
            var html = '<ul class="list">',
                self = this;

            this.models.each(function(todo, index) {
                if (self.mode === "archive" ? todo.get("archived") === true : todo.get("archived") === false) {
                    var template = _.template($("#tpl-list-item").html());

                    html += template({
                        title: todo.get("title"),
                        index: index,
                        archiveLink: self.mode === "archive" ? "unarchive" : "archive",
                        done: todo.get("done") ? "yes" : "no",
                        doneChecked: todo.get("done")  ? 'checked=="checked"' : ""
                    });
                }
            });

            html += '</ul>';
            self.$el.html(html);
            self.delegateEvents();
            return self;
        },
        priorityUp: function (e) {
            var index = parseInt(e.target.parentNode.parentNode.getAttribute("data-index"));
            this.model.up(index);
        },
        priorityDown: function (e) {
            var index = parseInt(e.target.parentNode.parentNode.getAttribute("data-index"));
            this.model.down(index);
        },
        archive: function (e) {
            var index = parseInt(e.target.parentNode.parentNode.getAttribute("data-index"));
            this.model.archive(this.mode !== "archive", index);
        },
        changeStatus: function (e) {
            var index = parseInt(e.target.parentNode.parentNode.getAttribute("data-index"));
            this.model.changeStatus(e.target.checked, index);
        },
        setMode: function (mode) {
            this.mode = mode;
            return this;
        }
    });

    return ListView;
});
