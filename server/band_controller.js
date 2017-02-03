var mongoose = require('mongoose');

var Band = mongoose.model('Band');

exports.getBands = function(req, res) {
  console.log("server/band_controller.js: getBands")
  
    Band.find({})
    .exec(function(err, bands) {
      console.log("BANDS",bands)
    if (!bands){
      res.json(404, {msg: 'band(s) Not Found.'});
    } else {
      res.json(bands);
    }
  });

}

exports.searchBands = function(req, res) {
  console.log("server/band_controller.js: searchBands")
  console.log("REQ.PARAMS",req.params);
    Band.find({ $text: { $search: req.params.searchText }})
    .exec(function(err, bands) {
      console.log("Search ",bands)
    if (!bands){
      res.json(404, {msg: 'band(s) Not Found.'});
    } else {
      res.json(bands);
    }
  });

}



exports.getOne = function(req, res) {
  console.log("server/band_controller.js: getOne",req.params)   
    Band.findById(req.params.id)
    .exec(function(err, band) {
      console.log("THE BAND",band)
    if (!band){
      res.json(404, {msg: 'band(s) Not Found.'});
    } else {
      res.json(band);
    }
  });
}

exports.createBand = function(req,res) {
  // console.log(req.body);
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
                            announce: req.body.announce,
                            cover:    req.body.cover,
                            video:    req.body.video
                        })

   band.save(function (err) {
    if (err) return handleError(err);
    res.json(band)
  });
}

exports.updateBand = function(req,res) {
  console.log(req.body.albums);
   Band.update( { _id: req.body._id },
                { $set:{
                      name:     req.body.name, 
                      city:     req.body.city, 
                      abstract: req.body.abstract,
                      contact:  req.body.contact,
                      weblink:  req.body.weblink,
                      facebook: req.body.facebook,
                      twitter:  req.body.twitter,
                      google:   req.body.google, 
                      style:    req.body.style, 
                      members:  req.body.members,
                      albums:   req.body.albums,
                      announce: req.body.announce,
                      cover:    req.body.cover,
                      video:    req.body.video
                }}
    )
    .exec (function(err,results){
      if (err || results < 1) {
     res.json(404, {msg: 'Failed to update band.'});
    } else {
     res.json({msg: "Band Updated"});
    }
  })
}

exports.deleteBand = function(req,res) {

  Band.remove({_id:req.body._id}, function(err){ 
      if (err) 
        { res.json(404, {msg: 'Failed to update band.'}); }
      else
        {res.json({msg:'deleted'})}
  })
}

/*

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
