app.models.toDo = Backbone.Model.extend({
   defaults: {
       title: "ToDo",
       archived: false,
       done: false
   }
});