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