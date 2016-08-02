
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  title: String,
  abstract: String,
  participant: [String],
  task: [{
    task_name: String,
    task_product: String, //projuct여기에등록?
    inchargeof: String, //type:user 가능?
    deadline: Date
  }],
  bp: [{
    bp_name: String,
    bp_contact: String
  }]
});

module.exports = mongoose.model('project', projectSchema);
