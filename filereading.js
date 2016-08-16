/*jslint node:true */
/*jslint nomen: true*/
var SQL = require('sql.js'); // npm install sql.js
var dbdir = __dirname + "\\db\\";
var dbdesc = require("./desc/cardlibs.js"); // Card Library
var functions = require("./libs/userfunctions.js"); // Custom Functions
var fs = require('fs'); //filewriting/reading library
var path = require('path');
var dbdir = __dirname + "/cdbs/";
var jsondir = __dirname + "/dbs/";
var db;

fs.readdir(dbdir, function (err, items) {
    "use strict";
    var i,
        stats;
    console.log(items);

    for (i = 0; i < items.length; i += 1) {
        var db = items[i],
            checkpath = dbdir + db,
            jsonpath = jsondir + path.basename(checkpath, '.cdb') + ".json";
        try {
            stats = fs.statSync(jsonpath);
            console.log(jsonpath + " already exists. Cancelling action.");
        } catch (e) {
            console.log(jsonpath + " does not exist. Creating it now.");
            fs.writeFile(jsonpath, JSON.stringify(functions.getcards(dbdir, db)));
        }
    }
});