/**
 * Created by mcolley on 14/11/13.
 */
var app = app || {};

app.Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    },

    toggle: function() {
        this.save({
            completed: !this.get('completed')
        })
    }
})