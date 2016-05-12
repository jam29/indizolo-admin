var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MemberSchema = new Schema({
  	name: String ,
	  instrument: String,
});

var typesAlbum = 'CD VINYL K7 MP3'.split(' ');

var TracksSchema = new Schema({
    title: String ,
    duration: Number 
});

var AlbumSchema = new Schema({
  		serial_id: String, 
  		type: { type: String, enum:typesAlbum },
  		title: String,
  		release_date: Date,
  		price: Number,
  		cover: String,
  		tracks: [TracksSchema]
});

var BandSchema = new Schema({
  name:     String,
  city:     String,
  abstract: String,
  contact:  String,
  weblink:  String,
  facebook: String,
  twitter:  String, 
  google:   String, 
  style:   [String], 
  members:  [MemberSchema],
  last_news:String,
  albums:   [AlbumSchema],
  announce: String
});

mongoose.model('Band', BandSchema);

