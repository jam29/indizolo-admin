var mongoose = require('mongoose');

var Banner = mongoose.model('Banner');

exports.getBanners = function(req, res) {
  console.log("server/banner_controller.js : getBanner") 
    Banner.find({})
    .exec(function(err, banners) {
      console.log("BANNERS",banners)
    if (!banners){

      res.json(404, {msg: 'banners Not Found.'});
    } else {
      res.json(banners);
    }
  });
}


/*
exports.createBand = function(req,res) {
   console.log(req.body);
    var band = new Band({   
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
                        })

   band.save(function (err) {
    if (err) return handleError(err);
    res.json(band)
  });
}
*/

exports.updateBanners = function(req,res) {
  console.log("BODY",req.body)
   Banner.update( { _id: req.body._id },
                { $set:{
                            title:     req.body.title, 
                            abstract:  req.body.abstract, 
                            date:      req.body.date,
                            flyer:     req.body.flyer
                }}
    )
    .exec (function(err,results){
      if (err || results < 1) {
     res.json(404, {msg: 'Failed to update banner.'});
    } else {
     res.json({msg: "Banner Updated"});
    }
  })

}

/*
exports.deleteBand = function(req,res) {

  Band.remove({_id:req.body._id}, function(err){ 
      if (err) 
        { res.json(404, {msg: 'Failed to update band.'}); }
      else
        {res.json({msg:'deleted'})}
  })
}


exports.getCustomer = function(req, res) {
  Customer.findOne({ userid: 'customerA' })
  .exec(function(err, customer) {
    if (!customer){
      res.json(404, {msg: 'Customer Not Found.'});
    } else {
      res.json(customer);
    }
  });
};

exports.updateShipping = function(req, res){
  var newShipping = new Address(req.body.updatedShipping);
  Customer.update({ userid: 'customerA' }, 
      {$set:{shipping:[newShipping.toObject()]}})
  .exec(function(err, results){
    if (err || results < 1){
     res.json(404, {msg: 'Failed to update Shipping.'});
    } else {
     res.json({msg: "Customer Shipping Updated"});
    }
  });
};

*/
