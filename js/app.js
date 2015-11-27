var app = (function () {
    var api = {
        views: {},
        models: {},
        collections: {},
        content: null,
        router: null,
        todos: null,
        init: function () {
            this.content = $('#content');
            this.todos = new api.collections.toDos();
            ViewsFactory.menu();
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

        },
        archive: function () {},
        newToDo: function () {},
        editToDo: function (index) {},
        deleteToDo: function (index) {}
    });
    api.router = new Router();

    return api;
})();