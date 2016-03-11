var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BandSchema = new Schema({
  name:  String,
  city:  String,
  style: [String]
});

mongoose.model('Band', BandSchema);
