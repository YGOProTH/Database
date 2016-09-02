//var jQuery = require('jquery-deferred'); // npm install jquery-deferred
var express = require('express');
var request = require('request'); //https://www.npmjs.com/package/request
var app = express();
var port = process.env.PORT || 4000;
var exphbs = require('express-handlebars');
var fs = require('fs'); //filewriting/reading library
var path = require('path');
var libs = require('require-all')(__dirname + '/../dbs');
var SQL = require('sql.js'); // npm install sql.js
var dbdesc = require("../desc/cardlibs.js"); // Card Library
var functions = require("../libs/userfunctions.js"); // Custom Functions
var APISnrk = require("../api/key.json"); // Custom Functions
var bodyParser = require('body-parser');
var dbinfo;
var dbdir = __dirname + "/../cdbs/";
var jsondir = __dirname + "/../dbs/";
var query, 
    ext, 
    mydb,
    search,
    webdb,
    webdblist
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
var wikiacardinfo

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
app.get('/home', function(req, res) {
  res.render("Home", {
    });
});
app.get('/cards', function(req, res) {
//query = req.param('name');
//mydb = req.param('db').toLowerCase();  
query = req.query['name'];
mydb = req.query['db'];  


    
webdb = libs[mydb]
webdblist = Object.keys(libs)

console.log("-----------------------" + "\n" + mydb);
    
if (mydb !== "wikia" && mydb !== "konami")  {
postCallback()
return;
}

if (mydb === "wikia")  {
    WikiaLookup()
    return;
}

    
function WikiaLookup() {
    var wikiacard = 'http://yugiohdb.somee.com/api/card/search?key=' + APISnrk.key + '&name=' + query + '&lin=en&lout=en'
	request(wikiacard, function(error, response, body) {
                var wikiacardinfo = JSON.parse(body);
                 if (wikiacardinfo.Code !== undefined) {   
     res.render("NotFound", {
    });
    return;
}
        if (wikiacardinfo.Limitation.TCG === null && wikiacardinfo.Limitation.OCG === null) {
        res.render("NotLegal", {
        });
            return;
        }
                var thistype = []
                for (i = 1; i < wikiacardinfo.Type.length; i += 1) {
                thistype.push(wikiacardinfo.Type[i]);
                }
                var cardformats = []
var i = 0
var displayFormat
var displayImage = wikiacardinfo.ImageUrl

var formats = Object.keys(wikiacardinfo.Limitation);
for(var thisformat in formats) {
    if (wikiacardinfo.Limitation[formats[thisformat]] !== null) {
    cardformats.push(formats[thisformat])
    }
}
        displayFormat = cardformats.join("/")
            console.log(thistype.join("/"))
            //console.log(args);
                res.render("Wikia", { 
        type: thistype.join("/"),
        attribute: wikiacardinfo.Attribute,
        race: wikiacardinfo.Type[0],
        level: wikiacardinfo.Level,
        lscale: wikiacardinfo.PendScale,
        rscale: wikiacardinfo.PendScale,
        effect: wikiacardinfo.Effect,
        pendeffect: wikiacardinfo.PendEffect,
        atk: wikiacardinfo.Atk,
        def: wikiacardinfo.Def,
        name: wikiacardinfo.Name,
        id: wikiacardinfo.Id,
        format: displayFormat,
        cardimg: displayImage,
        dropdowns: webdblist
});
    //console.log(wikiacardinfo);
				});
//http://yugiohdb.somee.com/api/card/search?key=secrky&name=Odd-eyes%20Pendulum%20Dragon&lin=en&lout=en
}
    
function postCallback() {

    
//http://yugiohdb.somee.com/api/card/search?key=secrky&name=Odd-eyes%20Pendulum%20Dragon&lin=en&lout=en    
if (webdb === undefined)  {
       res.render("NotFound", {
});
    return;
}
    
dbinfo = functions.getByName(webdb, query);

carddata = functions.parseCardData(dbinfo);

functions.getType(dbinfo,carddata);
    
renderCard(carddata)
}    
    
    

function displayCard() {
//console.log(carddata);
res.send(carddata)
}    
    
    
function renderCard(thiscard) { // This is 2nd
    console.log(thiscard.id) 
    if (thiscard.id === undefined) {
       res.render("NotFound", {
    });
    return;
    }
    var thisTemplate
    if (thiscard.type.indexOf("Monster") > -1) {
       thisTemplate = "bootstraps"
    }
    if (thiscard.type.indexOf("Pendulum") > -1) {
       thisTemplate = "Pendulum"
    }
    if (thiscard.type.indexOf("Spell") > -1 || thiscard.type.indexOf("Trap") > -1) {
       thisTemplate = "SpellTrap"
    }
    //var cardpath = "http://127.0.0.1" + ":" + port + "/pics/"
    var cardpath = "https://raw.githubusercontent.com/shadowfox87/YGOTCGOCGHQPics/master/"
    var thisimg = cardpath + thiscard.id + "." + "jpg"
    if (thiscard.format === "Anime") {
       var cardpath = "https://raw.githubusercontent.com/shadowfox87/YGOAnimeMangaHQPics/master/"
    var thisimg = cardpath + thiscard.id + "." + "jpg"
    }
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
        cardimg: thisimg,
        dropdowns: webdblist
});
};
    
});

