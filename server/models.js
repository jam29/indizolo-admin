var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//----- band
var MemberSchema = new Schema({
  	name: String ,
	  instrument: String,
    autres_groupes: [{ type: Schema.Types.ObjectId, ref: 'Band' }]
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
    announce: String,
    cover: String,
    video: String

});

mongoose.model('Band', BandSchema);

//------------------ banner
var BannerSchema = new Schema ({
  title:String,
  flyer:String,
  date: String,
  abstract: String
})

mongoose.model('Banner', BannerSchema );

//------------------ carousel
var CarouselSchema = new Schema ({  
  image:String,
  title:String,
  url:String
});

mongoose.model('Carousel', CarouselSchema );



