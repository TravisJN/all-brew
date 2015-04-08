//Set up simple server, no fluff
var express = require('express');
var bodyParser = require('body-parser')
var getBeers = require('./server/utility/helpers.js');

var app = express();
var port = process.env.PORT || 3333;

app.use('/', express.static(__dirname + '/client'));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.post('/', function(req, res){
  console.log(req.body.brewery);
  getBeers(req, res, function(resp, image){
    //console.log(resp);
    res.json({resp: resp, image:image});
    // res.end(JSON.stringify({resp: resp, image: image}));
  })
});

app.listen(port, function(){ console.log( 'listening at port ' + port + '...')});
