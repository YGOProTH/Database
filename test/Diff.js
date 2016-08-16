var dbdesc = require("../desc/cardlibs.js"); // Card Library
var functions = require("../libs/userfunctions.js"); // Custom Functions
//var code = 7209135
var code = 7667828
//var code = 173

console.log(functions.getSetname(code))


function getType(info,thiscard) {
    "use strict";
    var desc = require("../desc/cardlibs.js"); // Card Library
    var here = require("./userfunctions.js") // Use functions in same functions file
        var check = info.type,
            dbdata = [],
            text = desc.type,
            hexkeys = text,
            ammt = here.TextConvert(check, hexkeys),
            HexText = [],
            arrayLength = ammt.length;
        for (var i = 0; i < arrayLength; i++) {
            //console.log(ammt[i])

            dbdata.push(hexkeys[ammt[i]]);
        }
        thiscard.type = dbdata.join('/');
        if (dbdata.join('/') === "") {
            thiscard.type = "None";
        };
};