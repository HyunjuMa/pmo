
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  pw : String
});

module.exports = mongoose.model('user', userSchema);
