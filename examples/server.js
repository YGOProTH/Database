// grab the packages we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

// routes will go here

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);

// routes will go here
app.get('/api/users', function(req, res) {
  var user_id = req.param('id');
  var token = req.param('token');
  var geo = req.param('geo');  

  res.send(user_id + ' ' + token + ' ' + geo);
});