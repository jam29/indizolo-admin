var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var MemberSchema = new Schema({
	name: String ,
	instrument: String
})

var BandSchema = new Schema({
  name:  String,
  city:  String,
  abstract: String,
  style: [String], 
  members: [MemberSchema]
});

mongoose.model('Band', BandSchema);
