var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  	email: 		String,
  	password: 	String,
  	firstname: 	String,
  	lastname: 	String,
  	adress1: 	String,
  	adress2:    String,
  	cp: 		String,
  	city: String    
});

mongoose.model('User', UserSchema);

