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
var bodyParser = require('body-parser');
var dbinfo;
var dbdir = __dirname + "/../cdbs/";
var jsondir = __dirname + "/../dbs/";
var query, 
    ext, 
    mydb,
    search,
    webdb;
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

/*exphbs.registerHelper('ifCond', function(v1, options) {
  if(v1 !== undefined || v1 !== "") {
    return options.fn(this);
  }
  return options.inverse(this);
});*/

var isFound;
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


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/search', function (req, res, next) {
// req.body will contains the parsed body 
 var thisname = req.body.cardname;
 var thisdb = req.body.dbname.toLowerCase();
    if (thisname === "") {
		thisname = "Sangan"
    }
    if (thisdb === "") {
		thisdb = "devpro"
    }
 var urltemplate = "/cards?db=" + thisdb + "&name=" + thisname
    //console.log(thisdb);
    //console.log(thisname);
    res.redirect(urltemplate);
    });

app.get('/cards', function(req, res) {
//query = req.param('name');
//mydb = req.param('db').toLowerCase();  
query = req.query['name'];
mydb = req.query['db'].toLowerCase();  
    
    
webdb = libs[mydb]

postCallback()

function postCallback() {
dbinfo = functions.getByName(webdb, query);

TextUpdate(dbinfo);

parseCardData(dbinfo);

functions.getType(dbinfo,carddata);
    
renderCard(carddata)
}    
    
    

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
    if (carddata.atk == -2) {
		carddata.atk = "?"
    }
    if (carddata.def == -2) {
        carddata.def = "?"
    }
};
    
function renderCard(thiscard) { // This is 2nd
    console.log(thiscard.id) 
    if (thiscard.id === undefined) {
       res.render("NotFound", {
    });
    return;
    }
    var thisTemplate
    if (thiscard.type.indexOf("Monster") > -1) {
       thisTemplate = "Monster"
    }
    if (thiscard.type.indexOf("Pendulum") > -1) {
       thisTemplate = "Pendulum"
    }
    if (thiscard.type.indexOf("Spell") > -1 || thiscard.type.indexOf("Trap") > -1) {
       thisTemplate = "SpellTrap"
    }
    var cardpath = "http://127.0.0.1" + ":" + port + "/pics/"
    var thisimg = cardpath + thiscard.id + "." + "jpg"
    res.render(thisTemplate, { 
        type: thiscard.type,
        attribute: thiscard.attribute,
        race: thiscard.race,
        level: thiscard.level,
        lscale: thiscard.lscale,
        rscale: thiscard.rscale,
        desc: thiscard.desc.replace(/\n/g,"<br>"), //.replace(/\n/g,"<br>"),
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

