var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);

app.use(express.bodyParser());
app.post('/', function(req, res) {
  console.log(req.body);
  res.send(200);
});