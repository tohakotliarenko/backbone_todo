define([
    'jquery',
    'underscore',
    'backbone',

    'app/models/toDo',
    'app/collections/toDos',
    'app/views/menu',
    'app/views/list',
    'app/views/form'
], function($, _, Backbone, TodoModel, TodosCollection, MenuView, ListView, FormView){

    var api = {
        views: {},
        models: {},
        collections: {},
        content: null,
        router: null,
        todos: null,
        init: function () {
            api.models.toDo = TodoModel;
            api.collections.toDos = TodosCollection;
            api.views = {
                menu: MenuView,
                list: ListView,
                form: FormView
            };

            this.content = $('#content');
            this.todos = new api.collections.toDos();
            ViewsFactory.menu();

            var TodosCollectionHandler = _.bind(ListView.prototype.render, ListView);
            //var TodosCollectionHandler = function () { ListView.prototype.render.call(ListView, ListView) };
                //_.bind(ListView.prototype.render, ListView);
            api.todos.on("change", TodosCollectionHandler);
            api.todos.on("add", TodosCollectionHandler);
            api.todos.on("remove", TodosCollectionHandler);

            Backbone.history.start();
            return this;
        },
        changeContent: function (el) {
            this.content.empty().append(el);
            return this;
        },
        title: function (str) {
            $("h1").text(str);
            return this;
        }
    };


    var ViewsFactory = {
        menu: function() {
            if(!this.menuView) {
                this.menuView = new api.views.menu({
                    el: $("#menu")
                });
            }
            return this.menuView;
        },
        list: function() {
            if(!this.listView) {
                this.listView = new api.views.list({
                    models: api.todos
                });
            }
            return this.listView;
        },
        form: function () {
            if(!this.formView) {
                this.formView = new api.views.form({
                    model: api.todos
                }).on("saved", function () {
                        api.router.navigate("", {trigger: "true"});
                    })
            }
            return this.formView;
        }
    };

    var Router = Backbone.Router.extend({
        routes: {
            "archive" : "archive",
            "new" : "newToDo",
            "edit/:index" : "editToDo",
            "delete/:index" : "deleteToDo",
            "" : "list"
        },
        list: function (archive) {
            var view = ViewsFactory.list();
            api
                .title(archive ? "Archive:" : "Your ToDos:")
                .changeContent(view.$el);
            view.setMode(archive ? "archive" : null).render();
        },
        archive: function () {
            this.list(true);
        },
        newToDo: function () {
            var view = ViewsFactory.form();
            api.title("Create new ToDo:").changeContent(view.$el);
            view.render();
        },
        editToDo: function (index) {
            var view = ViewsFactory.form();
            api.title("Edit:").changeContent(view.$el);
            view.render(index);
        },
        deleteToDo: function (index) {
            api.todos.remove(api.todos.at(parseInt(index)));
            api.router.navigate("", {trigger: true});
        }
    });
    api.router = new Router();


    return api;
});
