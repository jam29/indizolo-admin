var express    = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer')

var mongoose   = require('mongoose');

//var db = mongoose.connect('mongodb://localhost/indizolo');
var db = mongoose.connect('mongodb://u8ldqkwpnavntsq:8IMMDQTaqQBUxgxs0l8h@bpksbgdhgo0jj10-mongodb.services.clever-cloud.com:27017/bpksbgdhgo0jj10');

require('./server/models.js');

var app = express();

app.engine('.html', require('ejs').__express)
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./routes')(app);

// upload
var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });

    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');

    /** API path that will upload the files */
    app.post('/upload', function(req, res) {
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        })
       
    });
app.listen(8080);
