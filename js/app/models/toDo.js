define([
    'backbone'
], function(Backbone){
    var ToDoModel = Backbone.Model.extend({
        defaults: {
            title: "ToDo",
            archived: false,
            done: false
        }
    });

    return ToDoModel;
});
