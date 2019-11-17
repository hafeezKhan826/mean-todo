const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: {
            unique: true
        }
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },
});
UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.compareHash = function (userPassword, password) {
    console.log(password, userPassword);
    return (bcrypt.compareSync(userPassword, password));
};
const User = mongoose.model('users', UserSchema);
module.exports = { User };
