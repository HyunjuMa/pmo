
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
  tname: String,
  product: [String], //일단 String
  desc: String,
  deadline: Date,
  state: String, //state:'todo','inprogress','resolved','done'중 하나 로 설정하고, 이것으로 클래스 지정해서 뷰 구분 
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
