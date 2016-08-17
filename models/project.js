
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
  tname: String,
  product: [String], //일단 String
  desc: String,
  deadline: Date,
  state: String,
  lastupdated: Date
});

var bpSchema = new Schema({
  bname: String,
  bcontact: {
    email: String,
    phone: String
  }
});

var projectSchema = new Schema({
  pname: String,
  pdesc: String,
  pm:String,
  task: [taskSchema],
  bp: [bpSchema]
});

module.exports = mongoose.model('project', projectSchema);
