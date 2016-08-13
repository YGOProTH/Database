//var jQuery = require('jquery-deferred'); // npm install jquery-deferred
var fs = require("fs"); //filewriting/reading library
var dbcards = require("./cards.json");
    //var redis = require("redis") // npm install redis
    //client = redis.createClient();

//var request = require('request'); //https://www.npmjs.com/package/request
//var remotefile = 'https://raw.githubusercontent.com/Bromantic/YGOPro-Web/master/cards.json'
var dbdesc = require("./desc/cardlibs.js"); // Card Library
var functions = require("./libs/userfunctions.js"); // Custom Functions
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
    /* request(remotefile, function (error, response, body) {
      if (!error && response.statusCode == 200) {
      var webdb = JSON.parse(body) */
    //console.log(webdb[1].name)
    // var dbinfo = webdb[6999]
var dbinfo = dbcards[2]; // Sample Card Value
    //var dbinfo = dbcards[6999] // Sample Card Value
TextUpdate(dbinfo);
var check = dbinfo.type;
carddata.level = functions.parselevel(dbinfo.level).level;
carddata.lscale = functions.parselevel(dbinfo.level).lscale;
carddata.rscale = functions.parselevel(dbinfo.level).rscale;
TextParse(dbinfo);
    //console.log(dbdata)
console.log(carddata);
    /*   }
    }) */

function TextConvert(amount, hex) { // Greedy Algorithm to divide Hex groups
    "use strict";
    var diff = [],
        total = 0,
        tempkey = functions.reverse(Object.keys(hex));
    tempkey.forEach(function (nums) {
        nums = parseInt(nums, 10); 
        //nums = Math.floor(nums)
        while (total + nums <= amount) {
            if (total + nums <= 0) {
            break;
            }
            diff.push(nums);
            total += nums;
            //console.log(diff)
            //console.log(total+"+"+nums+"<="+amount)
            //console.log(total)
            
        }
    });
    //console.log(diff)
    return diff;
}

function TextParse(info) {
    "use strict";
    Object.keys(dbdesc).forEach(function (num) { // Loop through Type, Attribute, and Race to readable text
        //console.log(num)
        var check = info[num],
            dbdata = [],
            text = dbdesc[num],
            hexkeys = text,
            ammt = TextConvert(check, hexkeys),
            HexText = [],
            arrayLength = ammt.length;
        for (var i = 0; i < arrayLength; i++) {
            //console.log(ammt[i])

            dbdata.push(hexkeys[ammt[i]]);
        }
        carddata[num] = dbdata.join('/');
        if (dbdata.join('/') === "") {
            carddata[num] = "None";
        };
        //console.log(carddata[num])
        console.log(carddata.setcode)

    });
};

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
        setcode: ""
    }
};