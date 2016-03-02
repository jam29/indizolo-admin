var express = require('express');

module.exports = function(app) {
  
  var bands = require('./server/band_controller');
  app.use('/static', express.static( './static')).
      use('/images', express.static( './images'))
  
  app.get('/', function(req, res){
    res.render('index');
  });	

  app.get('/bands/get', bands.getBands);
  // app.post('/customers/update/shipping', customers.updateShipping);
}
