exports.generateCard = function generateCard(thiscard) {
var express = require('express');
var replaced = thiscard.name.replace(/ /g,"_")
replaced = replaced.replace(/\//g,"")
console.log(replaced)
var urlpath = '/cards/' + replaced
var app = express();
var exphbs = require('express-handlebars');
var ext = ".jpg"
var cardpath = "http://127.0.0.1:2000" + "/pics/" 
var thisimg = cardpath + thiscard.id + ext
app.engine('handlebars', 
    exphbs({defaultLayout: 'main'})); 
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
var options = { dotfiles: 'ignore', etag: false,
extensions: ['htm', 'html'],
index: false
};
app.use(express.static(__dirname , options  ));
console.log(__dirname)
app.get(urlpath, function(req, res)
//app.get('urlpath', function(req, res)
{
res.render('card', { 
        type: thiscard.type,
        attribute: thiscard.attribute,
        race: thiscard.race,
        level: thiscard.level,
        lscale: thiscard.lscale,
        rscale: thiscard.rscale,
        desc: thiscard.desc.replace(/\n/g,"<br>"),
        atk: thiscard.atk,
        def: thiscard.def,
        name: thiscard.name,
        id: thiscard.id,
        format: thiscard.format,
        setcode: thiscard.setcode,
        cardimg: thisimg
});
});
console.log(urlpath)
app.listen(app.get('port'),  function () {
console.log('Cards express started on http://localhost:' +
app.get('port') + '; press Ctrl-C to terminate.' );
});
}