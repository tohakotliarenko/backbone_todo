app.collections.toDos = Backbone.Collection.extend({
    initialize: function () {
        this.add({title: "Learn JavaScript basics"});
        this.add({title: "My second comment"});
        this.add({title: "Develop my backbone application"});
    },
    model: app.models.toDo,
    up: function (index) {
        if (index > 0) {
            var tmp = this.models[index-1];
            this.models[index-1] = this.models[index];
            this.model[index] = tmp;
            this.trigger("change");
        }
    },
    down: function (index) {
        if (index < this.models.length - 1) {
            var tmp = this.models[index+1];
            this.models[index+1] = this.models[index];
            this.models[index] = tmp;
            this.trigger("change");
        }
    },
    archive: function (archived, index) {
        this.models[index].set("archived", archived);
    },
    changeStatus: function (done, index) {
        this.models[index].set("done", done);
    }
});