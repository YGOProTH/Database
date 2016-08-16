var fs = require('fs');
var dbcards = require("./cards.json")
var dbdesc = require("./desc/cardlibs.js")
var dbinfo = parselevel(dbcards[2].level)
var test = '1'
console.log(dbinfo.level)
//console.log(dbdesc.attribute)
console.log(dbdesc.attribute[test])

function parselevel(rawlevel) {
var cardinfo = {
lscale: "",
rscale: "",
level: ""
}
var cardlvl = Math.floor(rawlevel)
if (isNaN(cardlvl) === true) {
cardinfo.level = 0
cardinfo.lscale = 0
cardinfo.rscale = 0
return cardinfo;
}
var hex = cardlvl.toString(16);
if (hex.length < 7) {
cardinfo.level = cardlvl
cardinfo.lscale = 0
cardinfo.rscale = 0
return cardinfo;
}
lvlcheck = cardlvl

cardinfo.lscale = parseInt(hex.substring(0, 1), 16)
cardinfo.rscale = parseInt(hex.substring(2, 3), 16)
cardinfo.level = parseInt(hex.substring(6, 7), 16)
//alert(hex.substring(0, 1)+" and "+hex.substring(2, 3)+" and "+hex.substring(6, 7))
//alert(cardinfo.lscale+" and "+cardinfo.rscale)
return cardinfo;
}

