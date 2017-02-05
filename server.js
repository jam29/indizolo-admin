
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


 //var db = mongoose.connect('mongodb://umqnqzlxdvsudat:C1Sy5EFDLleRYiEGEixr@bsrhghbr5gqng0h-mongodb.services.clever-cloud.com:27017/bsrhghbr5gqng0h');
 var db = mongoose.connect('mongodb://umv26kv2288lzv7:qAif8N746UNeUm4s9Cx7@b1eflgsgur8yey1-mongodb.services.clever-cloud.com:27017/b1eflgsgur8yey1');

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
        console.log("session:",req.session);
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

 app.get('/', ensureAuthenticated ,function(req, res) { res.redirect('/index'); }); 
 app.get('/index', ensureAuthenticated ,function(req, res) { 
  console.log ("USER:",req.user)
  console.log ("USERNAME:",req.user.username)
  console.log ("PASSWORD:",req.user.password)
  res.render('index'); }); 

 // app.get('/', function(req, res) {res.render('index'); });   

  app.get  ('/bands/get' , bands.getBands ) ;  
  app.get  ('/bands/getOne/:id' , bands.getOne ) ;
  app.post ('/bands/post'   , ensureAuthenticated , bands.createBand  ) ; 
  app.post ('/bands/put'    , ensureAuthenticated ,       bands.updateBand  ) ; 
  app.post ('/bands/delete' , ensureAuthenticated ,       bands.deleteBand  ) ; 
  app.get  ('/bands/liste/:searchText',  bands.searchBands ) ;

  app.get('/banners/get'   ,  banners.getBanners ) ;
    app.post('/banners/post'  ,  banners.addBanner ) ;
  app.post('/banners/put'  ,  banners.updateBanners ) ;  

  app.get('/carousel/get'  ,   carousel.getCarousel ) ;
  app.post('/carousel/put' ,   carousel.updateCarousel ) ;  
  app.post('/carousel/post' ,  carousel.addCarousel ) ; 
  // app.post ('/carousel/delete' , ensureAuthenticated , carousel.deleteCarousel  ) ;  
  app.post ('/carousel/delete' , ensureAuthenticated , carousel.deleteCarousel ) ;  

  app.get('/login', function(req, res) {   
    if (req.isAuthenticated()) { console.log ("ALREADY AUTH",req.user) ; return }
        else {
            res.render('login');
        }
  });

  app.get('/logout', function(req, res) {
    console.log("logout",req.session)
    req.session.destroy();
    req.logout();
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
