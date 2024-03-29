/**
 * Created by mcolley on 14/11/13.
 */
var app = app || {};

// Todo Item View
// --------------

// The DOM element for a todo item...
app.TodoView = Backbone.View.extend({

    //... is a list tag.
    tagName: 'li',

    // Cache the template function for a single item.
    template: _.template( $('#item-template').html() ),

    // The DOM events specific to an item.
    events: {
        'dblclick label': 'edit',
        'keypress .edit': 'updateOnEnter',
        'blur .edit': 'close',
        'click .toggle' : 'toggleCompleted',
        'click .destroy': 'clear'

    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'visible', this.toggleVisible);
    },

    // Re-renders the titles of the todo item.
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        this.$input = this.$('.edit');
        return this;
    },

    toggleVisible : function () {
        this.$el.toggleClass( 'hidden', this.isHidden() );
    },

    isHidden: function() {
        var isCompleted = this.model.get('completed');

        return (
            (!isCompleted && app.TodoFilter === 'completed')
            || (isCompleted && app.TodoFilter === 'active')
            );
    },

    toggleCompleted: function () {
        this.model.toggle();
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
        this.$el.addClass('editing');
        this.$input.focus();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
        var value = this.$input.val().trim();

        if ( value ) {
            this.model.save({ title: value });
        }

        this.$el.removeClass('editing');
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function( e ) {
        if ( e.which === ENTER_KEY ) {
            this.close();
        }
    },

    clear: function() {
        this.model.destroy();
    }
});