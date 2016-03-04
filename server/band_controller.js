var mongoose = require('mongoose');

var Band = mongoose.model('Band');

exports.getBands = function(req, res) {
  Band.find({})
  .exec(function(err, bands) {
    if (!bands){
      res.json(404, {msg: 'Customer Not Found.'});
    } else {
      res.json(bands);
    }
  });
};

exports.createBand = function(req,res) {
    var band = new Band( { name: req.body.name , city: req.body.city ,style: req.body.style } )
    console.log(req.body);

   band.save(function (err) {
    if (err) return handleError(err);
    res.json(band)
  });
}

exports.updateBand = function(req,res) {
   Band.update( { _id: req.body._id },
                { $set:{
                  name: req.body.name,
                  city: req.body.city,
                  style: req.body.style
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