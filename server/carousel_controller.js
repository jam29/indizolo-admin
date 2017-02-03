var mongoose = require('mongoose');
mongoose.set('debug', true)
var Carousel = mongoose.model('Carousel');

exports.getCarousel = function(req, res) {
  console.log("server/carousel_controller.js : getCarousel")
  
    Carousel.find({})
    .exec(function(err, carousel) {
      
    if (!carousel){
      console.log('err carousel')
      res.json(404, {msg: 'carousel Not Found.'});
    } else {
      console.log("CRSL:",carousel)
      res.json(carousel);
    }
  });

}

exports.addCarousel = function(req,res) {
  console.log("server/carousel_controller.js:addCarousel")
  var carousel = new Carousel({   
                            image:     req.body.image, 
                            titre:     req.body.titre, 
                            url: req.body.url                       
                        })

   carousel.save(function (err) {
    if (err) return handleError(err);
    res.json(carousel)
  });
}


exports.deleteCarousel = function(req,res) {
  console.log("server/carousel_controller.js:deleteCarousel");

  Carousel.remove( { _id: req.body.id }, function(err){ 
      if (err) 
        { res.json(404, {msg: 'Failed to update band.'}); }
      else
        {res.json({msg:'deleted'})}
  })
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

exports.updateCarousel = function(req,res) {
  console.log("BODY",req.body)
   Carousel.update( { _id: req.body._id },
                { $set:{
                            title:      req.body.title, 
                            image:      req.body.image,
                            url:        req.body.url
                }}
    )
    .exec (function(err,results){
      if (err || results < 1) {
     res.json(404, {msg: 'Failed to update carousel.'});
    } else {
     res.json({msg: "Carousel Updated"});
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
