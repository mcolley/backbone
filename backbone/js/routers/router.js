/**
 * Created by mcolley on 14/11/13.
 */


var Workspace = Backbone.Router.extend({
    routes: {
        '*filter' : 'setFilter'
    },

    setFilter: function (param) {
        if (param) {
            param = param.trim();
        }
        app.TodoFilter = param || '';

        app.Todos.trigger('filter');
    }
});

app.TodoRouter = new Workspace();

backbone.history.start();