require.config({
    paths: {
        jquery:      'vendor/jquery-1.11.3.min',
        underscore:  'vendor/underscore-min',
        backbone:    'vendor/backbone',
        application: 'app/application'
    }
    //shim: {
    //    'application': {
    //      deps: ['jquery', 'underscore', 'backbone']
    //    },
    //    'underscore': {
    //        exports: '_'
    //    }
    //}
});

require([
    'application'
], function(App) {
    App.init();
});
