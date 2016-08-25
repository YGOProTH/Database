//var jQuery = require('jquery-deferred'); // npm install jquery-deferred
var express = require('express');
var app = express();
var port = process.env.PORT || 4000;
var exphbs = require('express-handlebars');
var fs = require('fs'); //filewriting/reading library
var path = require('path');
var libs = require('require-all')(__dirname + '/../dbs');
var SQL = require('sql.js'); // npm install sql.js
var dbdesc = require("../desc/cardlibs.js"); // Card Library
var functions = require("../libs/userfunctions.js"); // Custom Functions
var cardserv = require("../libs/handlecard.js");
var imgserv = require("../libs/handleimg.js");
var dbinfo;
var dbdir = __dirname + "/../cdbs/";
var jsondir = __dirname + "/../dbs/";
var query, 
    ext, 
    mydb,
    search;
app.engine('handlebars', 
    exphbs({defaultLayout: 'main'})); 
app.set('view engine', 'handlebars');

var options = { dotfiles: 'ignore', etag: false,
extensions: ['htm', 'html'],
index: false
};

app.use(express.static(__dirname + '/../' , options));
app.use('/pics', express.static(__dirname + '/../pics'));

// routes will go here

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
    //res.send(queryname + "\n" + targetdb);
// routes will go here
app.get('/cards', function(req, res) {
query = req.param('name');
//ext = req.param('ext');
//mydb = req.param('mydb');
//res.send(mydb);

    
var carddata = {
        type: "",
        attribute: "",
        race: "",
        level: "",
        lscale: "",
        rscale: "",
        desc: "",
        atk: "",
        def: "",
        name: "",
        id: "",
        format: "",
        setcode: ""
    };  

startDB(query);
    
TextUpdate(dbinfo);

parseCardData(dbinfo);

//TextParse(dbinfo)
functions.getType(dbinfo,carddata);

renderCard(carddata);

//displayCard()

//console.log(carddata);

//functions.webserver(carddata,"cards",carddata.id)
//functions.imgserver(carddata.id)
//imgserv.generateImages(__dirname + "/../pics")
//cardserv.generateCard(carddata)

function startDB(queryname) { // This is 2nd
    search = "Devpro"
    //dbinfo = functions.getByName(libs[search], queryname);
    res.send(libs[queryname]);
    //res.send(functions.getByName(req.param('name')));
    //dbinfo = functions.getByName(libs[search], queryname);
};
    

function displayCard() {
console.log(carddata);
res.send(carddata)
}    
    
function parseCardData(dbinfo,__dirname) {
//var check = dbinfo.type;
carddata.level = functions.parselevel(dbinfo.level).level;
carddata.lscale = functions.parselevel(dbinfo.level).lscale;
carddata.rscale = functions.parselevel(dbinfo.level).rscale;
carddata.setcode = functions.getSetname(dbinfo.setcode);
carddata.format = functions.getCardData("format",dbinfo.ot);
carddata.race = functions.getCardData("race",dbinfo.race);
carddata.attribute = functions.getCardData("attribute",dbinfo.attribute);
//console.log(carddata.format);
//TextParse(dbinfo);
}


function TextUpdate(info) { // This is 2nd
    carddata = {
        type: "",
        attribute: "",
        race: "0",
        level: "",
        lscale: "",
        rscale: "",
        desc: info.desc,
        atk: info.atk,
        def: info.def,
        name: info.name,
        id: info.id,
        format: "",
        setcode: ""
    }
};
    
function renderCard(thiscard) { // This is 2nd
    var cardpath = "http://127.0.0.1" + ":" + port + "/pics/"
    var thisimg = cardpath + thiscard.id + "." + jpg
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
};
    
});

