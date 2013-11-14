/**
 * Created by mcolley on 13/11/13.
 */
var Todo = Bacbone.Model.extend({
    defaults: {
        title:'',
        completed:false
    }
});

var myTodo = new Todo({
    title: 'Check attributes property of the logged models in the console'
})