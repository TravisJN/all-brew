var request = require('request');
var key = require('../api/api.js');

module.exports = function(req, res, callback){
  console.log(key);
  request({
    url: 'http://api.brewerydb.com/v2/breweries/',
    qs: {key: key, name: req.body.brewery},
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }, function(error, response, body){
    if(error){
      console.log('line 15 helpers.js Error: ', error);
    } else {
      //console.log(body);
      body = JSON.parse(body);
      var image = body.data[0].images.medium || null;
      console.log('images: ', image);
      var breweryId = body.data[0].id;

      request({
        url: 'http://api.brewerydb.com/v2/brewery/' + breweryId + '/beers/',
        qs: {key: key},
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }, function(err, resp, beers){
        if(error){
          console.log('line 29 helpers.js Error: ', err);
        } else {
          callback(resp, image);
        }
      });
    }
  });
}

