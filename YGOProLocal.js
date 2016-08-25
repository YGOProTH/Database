//var jQuery = require('jquery-deferred'); // npm install jquery-deferred
var fs = require('fs'); //filewriting/reading library
var path = require('path');
var libs = require('require-all')(__dirname + '/dbs');
var SQL = require('sql.js'); // npm install sql.js
var dbdesc = require("./desc/cardlibs.js"); // Card Library
var functions = require("./libs/userfunctions.js"); // Custom Functions
var cardserv = require("./libs/handlecard.js");
var imgserv = require("./libs/handleimg.js");
var dbinfo;
var dbdir = __dirname + "/cdbs/";
var jsondir = __dirname + "/dbs/";
var search = "name",
    query = "Heavy storm",
    targetdb = "DevPro",
//var dbcards = JSON.stringify(dbcards);
    //dbinfo = functions.getcards(dbcards, query),
    dbinfo = functions.getByName(libs[targetdb], query),
    carddata = {
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
  
TextUpdate(dbinfo);

parseCardData(dbinfo)

//TextParse(dbinfo)
functions.getType(dbinfo,carddata)

displayCard()
//console.log(carddata);

//functions.webserver(carddata,"cards",carddata.id)
//functions.imgserver(carddata.id)
imgserv.generateImages(__dirname + "/pics")
cardserv.generateCard(carddata)

function displayCard() {
console.log(carddata);
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
        race: "",
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