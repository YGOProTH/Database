var fs = require("fs"); //filewriting/reading library
var dbcards = require("./cards.json");
var setname = require("./desc/setcodes.js"); 
var dbdesc = require("./desc/cardlibs.js"); // Card Library
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
        setcode: ""
    };
var search = "name"; 
var query = 1001;
//var dbinfo = dbcards[90];
var thissetcode = dbcards[query].setcode;

var cardinfo = dbcards[query][search];
//var cardinfo = cardinfo[query];
//console.log(cardinfo);
//console.log(cardinfo);

//console.log(query);

var archetypes = getSetname(dbcards[query].setcode);
console.log(archetypes.join(','));


function getSetname(thissetcode) {
    'use strict';
    var i,
        formatsetnames = [],
        setnames = [],
        setcodes = [ thissetcode & 0xffff,
            thissetcode >> 16 & 0xffff,
            thissetcode >> 32 & 0xffff,
            thissetcode >> 64 & 0xffff],
        usetcodes = setcodes.filter(function (item, pos) {
        //return setcodes.indexOf(item) === pos;
            //console.log(setcodes.indexOf(item) === pos);
            //console.log(pos);
            //console.log(setcodes);
            //console.log(setcodes.indexOf(item));
            //console.log(item)
            //console.log(item.toString(16))
            //console.log(setname.setcodes[item])
            setnames.push(setname.setcodes[item])
        });
for (i = 0; 4 > i; i++) {
    if (i === 0) {
        formatsetnames.push(setnames[i])
    }
    if (setnames[0] !== setnames[i]) {
        formatsetnames.push(setnames[i])
    }
}
 if (formatsetnames.length > 1) {
       for (i = 0; formatsetnames.length > i; i++) {
    if (formatsetnames[i] === "None") {
        formatsetnames.splice(i, i);    
    }
    
}
    }
//console.log(formatsetnames)
return formatsetnames;
}