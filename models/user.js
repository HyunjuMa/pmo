
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  pw : String,
  contact : {
    email: String,
    phone: String
  }
});

module.exports = mongoose.model('user', userSchema);
