var fs = require('fs'); //filewriting/reading library
var libs = require('require-all')(__dirname + '/dbs');
var path = require('path');
var SQL = require('sql.js'); // npm install sql.js
var dbdesc = require("./desc/cardlibs.js"); // Card Library
var functions = require("./libs/userfunctions.js"); // Custom Functions
var filters = require("./libs/filters.js"); // Custom Functions
var dbinfo;
var dbdir = __dirname + "/cdbs/";
var jsondir = __dirname + "/dbs/";
var search = "name",
    query = "Shapesnatch",
    targetdb = "DevPro",
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
//console.log(dbinfo)
//var percyAll = libs["Percy"].length + libs["official"].length + libs["prerelease"].length
//console.log(percyAll)
//var cardlist = dbcards.filter(filterByDesc(dbcards,"Sangan"));
//console.log(dbcards["desc"].indexOf("Sangan") > -1)
//console.log(cardlist)

//var checkCards = dbcards.filter(function (item) { return item["desc"].indexOf("Sangan"); } );
//console.log(checkCards.length)





var tcg = filters.filterByFormat(libs[targetdb],2)
var ocg = filters.filterByFormat(libs[targetdb],1) 
var legal = filters.filterByFormat(libs[targetdb],3)  
console.log("Percy")
console.log("TCG Only - "+tcg.length)
console.log("OCG Only - "+ocg.length)
console.log("Legal - "+legal.length)


    

/*function filterByFormat(cardobj,value) {
  var tempval = cardobj.filter(function (c) {
    return c.ot === value;
})
  return tempval;
}
function filterByType(cardobj,value) {
    var tempval = cardobj.filter(function (c) {
    return c.type === value;
})
  return tempval;
}
function filterByAttribute(cardobj,value) {
    var tempval = cardobj.filter(function (c) {
    return c.attribute === value;
})
  return tempval;
}
function filterByRace(cardobj,value) {
    var tempval = cardobj.filter(function (c) {
    return c.race === value;
})
  return tempval;
}
function filterByLevel(cardobj,value) {
    var tempval = cardobj.filter(function (c) {
    return c.level === value;
})
  return tempval;
}
function filterByLscale(cardobj,value) {
    var tempval = cardobj.filter(function (c) {
    return c.lscale === value;
})
  return tempval;
}
function filterByRscale(cardobj,value) {
    var tempval = cardobj.filter(function (c) {
    return c.rscale === value;
})
  return tempval;
}
function filterByDesc(cardobj,value) {
  var tempval = cardobj.filter(function (c) {
    return ((c.desc).indexOf(value) > -1);
})
  return tempval;
}
function filterByAtk(cardobj,value) {
    var tempval = cardobj.filter(function (c) {
    return c.atk === value;
})
  return tempval;
}
function filterByDef(cardobj,value) {
    var tempval = cardobj.filter(function (c) {
    return c.def === value;
})
  return tempval;
}
function filterByName(cardobj,value) {
  var tempval = cardobj.filter(function (c) {
    return ((c.desc).indexOf(value) > -1);
})
  return tempval;
}
function filterById(cardobj,value) {
    var tempval = cardobj.filter(function (c) {
    return c.id === value;
})
  return tempval;
}
function filterBySetName(cardobj,value) {
    var tempval = cardobj.filter(function (c) {
    return c.setname === value;
})
  return tempval;
}*/