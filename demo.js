//var jQuery = require('jquery-deferred'); // npm install jquery-deferred
var fs = require("fs"); //filewriting/reading library
var dbcards = require("./cards.json")
//var request = require('request'); //https://www.npmjs.com/package/request
//var remotefile = 'https://raw.githubusercontent.com/Bromantic/YGOPro-Web/master/cards.json'
var dbdesc = require("./desc/cardlibs.js") // Card Library
var functions = require("./libs/userfunctions.js") // Custom Functions
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
	}
/* request(remotefile, function (error, response, body) {
  if (!error && response.statusCode == 200) {
	var webdb = JSON.parse(body) */
	//console.log(webdb[1].name)
	// var dbinfo = webdb[6999]
	var dbinfo = dbcards[6999]
	var check = dbinfo.type
	carddata.level = functions.parselevel(dbinfo.level).level
	carddata.lscale = functions.parselevel(dbinfo.level).lscale
	carddata.rscale = functions.parselevel(dbinfo.level).rscale
	TextParse(dbinfo)
	//console.log(dbinfo.name)
	//console.log(dbdata)
	console.log(carddata)
/*   }
}) */

function TextConvert(amount,hex) { // This is 2nd
		var diff = []
		var total = 0;
		var tempkey = functions.reverse(Object.keys(hex))
		tempkey.forEach(function(nums) {
		nums = parseInt(nums)
	
	//nums = Math.floor(nums)
    while (total + nums <= amount) {
	  diff.push(nums);
      total += nums;
	  //console.log(diff)
    }
  });
  console.log(diff)
  return diff;
};

function TextParse(info) { // This is 2nd
Object.keys(dbdesc).forEach(function(num) { // Loop through Type, Attribute, and Race to readable text
		var check = info[num]
		var dbdata = []
		text = dbdesc[num]
		var hexkeys = text
		var ammt = TextConvert(check,hexkeys);
		//console.log(ammt)
		var HexText = []
		var arrayLength = ammt.length;
		for (var i = 0; i < arrayLength; i++) {
		//console.log(ammt[i])
		
		dbdata.push(hexkeys[ammt[i]])
		//console.log(hexsearch(ammt[i]))
		}
		carddata[num] = dbdata.join('/');
		if (dbdata.join('/') === "") {
		carddata[num] = "None"
		}
		//console.log(carddata[num])
		
});
};

/* function TextUpdate(info) { // This is 2nd
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
	setcode: ""
	}
}; */
