var express = require('express');
var path = require('path');
var app = express();
var exphbs = require('express-handlebars'); 
app.engine('handlebars', 
    exphbs({defaultLayout: 'main'})); 
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
var options = { dotfiles: 'ignore', etag: false,
extensions: ['htm', 'html'],
index: false
};
app.use(express.static(path.join(__dirname, 'public') , options  ));
app.get('/', function(req, res)
{
res.render('hello');   // this is the important part
});
app.get('/bodie', function(req, res)
{
res.render('bodie');
});
app.get('/june', function(req, res)
{
res.render('june');
});
app.get('/lee', function(req, res)
{
res.render('town', { town: "Lee Vining"});
});
app.listen(app.get('port'),  function () {
console.log('Hello express started on http://localhost:' +
app.get('port') + '; press Ctrl-C to terminate.' );
});