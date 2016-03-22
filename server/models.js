var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MemberSchema = new Schema({
	name: String ,
	instrument: String,
	member_of: [String]
})

vat typesAlbum = 'CD VINYL K7 MP3'.split(' ')
var AlbumSchema = new Schema({
  		serial_id: String, 
  		type: { type:String, enum:typesAlbums },
  		title: String,
  		release_date: Date,
  		price: Number,
  		cover: String,
  		tracks: [{
  			title: String,
  			duration: Number
  		}]
})

var BandSchema = new Schema({
  name:  String,
  city:  String,
  abstract: String,
  contact: String,
  weblink: String,
  facebook: String,
  twitter: String, 
  google: String, 
  style: [String], 
  members: [MemberSchema],
  last_news: String,
  albums: [AlbumSchema],
  announce: String
});

mongoose.model('Band', BandSchema);

 							/*
 							name:     req.body.name, 
                            city:     req.body.city, 
                            abstract: req.body.abstract,
                            contact:  req.body.contact,
                            weblink:  req.body.weblink,
                            facebook: req.body.facebook,
                            twitter:  req.body.twitter,
                            google:   req.body.google, 
                            style:    req.body.style , 
                            members:  req.body.members,
                            albums:   req.body.albums,
                            announce: req.body.announce
                            */

