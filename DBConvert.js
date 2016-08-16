//Credit goes to https://github.com/SalvationDevelopment for help with this code
var fs = require("fs"); //filewriting/reading library
var request = require('request'); //https://www.npmjs.com/package/request
var SQL = require('sql.js'); // npm install sql.js
//var temppath = "C:\Users\salis\Documents\Database\cdbs"
//var dbpath = "cdbs"
var dbfile = "prerelease.cdb";
//console.log(dbfull)
//getcards(path,file)
console.log(getcards(dbfile));
//var mysize = getFilesizeInBytes(dbfull)
console.log("Ending");



function getcards(file) {
    //var fulldb = __dirname + "\\\\" + path + "\\\\" + file
    "use strict";
    var filebuffer = fs.readFileSync(__dirname+"/cdbs/"+file),
        db = new SQL.Database(filebuffer),
        string = "SELECT * FROM datas, texts WHERE datas.id = texts.id;",
        texts = db.prepare(string),
        asObject = {
            texts: texts.getAsObject({
                'id': 1
            })
        },
        output = [],
        row;

    // Bind new values
    texts.bind({
        name: 1,
        id: 2
    });
    while (texts.step()) { //
        row = texts.getAsObject();
        output.push(row);
    }
    db.close();

    return output;
}