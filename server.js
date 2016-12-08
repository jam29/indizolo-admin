
var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);

var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var AWS = require('aws-sdk');
AWS.config.update({accessKeyId: 'RCITZM0P-3E3TL7YURFD', secretAccessKey: 'PPHUQ9PpZf0HcFCBEXQ2W1px4r25inGyf7Ey4g=='});
var ep = new AWS.Endpoint('cellar.services.clever-cloud.com');
var s3 = new AWS.S3({ endpoint: ep, signatureVersion: 'v2'});

var db = mongoose.connect('mongodb://localhost/indizolo');
// var db = mongoose.connect('mongodb://u8ldqkwpnavntsq:8IMMDQTaqQBUxgxs0l8h@bpksbgdhgo0jj10-mongodb.services.clever-cloud.com:27017/bpksbgdhgo0jj10');

require('./server/models.js');
require('./server/user.js');
var Users = mongoose.model('User');

app.use('/static', express.static( './static')) ; // old route
app.use('/images', express.static( './images')) ; // old route

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  Users.findById(id, function(err, user) {
    //console.log(user);
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
    Users.findOne({
      'username': username, 
    }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      if (user.password != password) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
}))


// app.use(express.static(path.join(__dirname, 'public')));


    function ensureAuthenticated(req,res,next) {
        console.log("USER:",req.user);
        if (req.isAuthenticated()) {
            next();
        } else {
            console.log("REDIRECT LOGIN");
            res.redirect("/login");
            return
        }
    }
 
  var bands     =   require('./server/band_controller');
  var banners   =   require('./server/banner_controller');
  var carousel  =   require('./server/carousel_controller');

 /* app.get('/', function(req, res) {res.redirect('/index'); }); */
 
  app.get('/', function(req, res) {res.render('index'); });   

  app.get  ('/bands/get'     ,          bands.getBands   ) ;  
  app.get  ('/bands/getOne/:id' ,       bands.getOne     ) ;
  app.post ('/bands/post'   ,           bands.createBand ) ; 
  app.post ('/bands/put'    ,           bands.updateBand ) ; 
  app.post ('/bands/delete' ,           bands.deleteBand ) ; 
  app.get  ('/bands/liste/:searchText', bands.searchBands) ;

  app.get('/banners/get'   ,  banners.getBanners ) ;
  app.post('/banners/put'  ,  banners.updateBanners ) ;  

  app.get('/carousel/get'  ,  carousel.getCarousel ) ;
  app.post('/carousel/put' ,  carousel.updateCarousel ) ;  

  app.post('/getSignedUrl', function(req,res) {
        var params = {Bucket: 'indizobjects', Key: req.filename };
        s3.getSignedUrl('putObject', params, function (err, url) {
          console.log("The URL is", url);
        });
  });

  app.get('/login', function(req, res) {   
    if (req.isAuthenticated()) { console.log ("ALREADY AUTH",req.user) ; return }
        else {
            res.render('login');
        }
  });

  app.get('/logout', function(req, res) {
    req.session.destroy()
    req.logout()
    res.redirect('/')
  });


  app.post('/login',
    passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/loginFailure'
  })
);

app.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});

/*
app.get('/loginSuccess', function(req, res, next) {
  res.send('Successfully authenticated');
});
*/

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


server.listen(8080);
console.log("listen on 8080")
