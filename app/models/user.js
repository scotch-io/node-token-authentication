var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('User', new Schema({
    name: String,
    password: String,
    admin: Boolean
}));
