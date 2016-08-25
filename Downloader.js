var functions = require("./libs/userfunctions.js");
var path = require('path');


            


var thisurl = "https://github.com/Ygoproco/Live/blob/master/official.cdb?raw=true";

var cdbpath = __dirname + "/cdbs/" + path.basename(thisurl.replace(/\?raw\=true/,""))
console.log(cdbpath)


functions.download(thisurl, cdbpath)