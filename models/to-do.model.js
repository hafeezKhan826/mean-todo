let mongoose = require('mongoose');
let Schema = require('mongoose').Schema;

let ToDoSchema = mongoose.Schema({
    email: {
        required: true,
        type: String,
        email: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'completed', 'deactivate'],
        default: 'active'
    },

});
let ToDo = mongoose.model('todo', ToDoSchema);
module.exports = { ToDo };
