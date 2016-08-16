var request = require('request'); //https://www.npmjs.com/package/request
var fs = require("fs"); //filewriting/reading library
var legalcards = require('./db/legalwikia.json');
var length = legalcards.length

var db = []
var br = "\n"
var cardinfo
//card descriptors
var wikiabody 
var id
var number 
var name 
var attribute
var type
var effect
var pendulum_effect 
var pendulum_scale
var dblevelint
var rank
var level
var atk
var def
var tcg
var ocg
var fullurl
//end of card descriptors
var length = legalcards.length
var i = 1540 //Start point
var j = i
var timeout = 100
var howManyTimes = length;
var wikiacard
function f() {
	wikiacard = 'http://yugioh.wikia.com/api.php?action=query&format=txt&redirects&prop=revisions&rvprop=content&titles=' + legalcards[i].title
	request(wikiacard, function(error, response, body) {
				cardinfo = g(body)
				db.push(cardinfo)
				fs.writeFile("./db/raws/ygoprowikia.json", JSON.stringify(db, null, 4));
				})
    i++;
    if( i < howManyTimes ){
        setTimeout( f, timeout );
    }
}
f();

function g(targetwikia) {                     
							var w = targetwikia.split("\n")
							var typecheck = 0
                            for (var x in w) {
                                var length = w[x].length
								var indexcheck = w[x].indexOf("=") + 2
                                if (w[x].substring(28, 35) === "[title]") {
                                    var name = w[x].substring(39, length)
									var r = /\\u([\d\w]{4})/gi;
                                }
                                if (w[x].substring(2, 11) === "attribute") {
                                    var attribute = w[x].substring(indexcheck, length)
                                }
                                if (w[x].substring(2, 7).indexOf("type") > -1) {
                                    typecheck++
                                    if (typecheck > 1) {
                                        var type = type + "/" + w[x].substring(indexcheck, length)
                                    } else {
                                        var type = w[x].substring(indexcheck, length)
                                    }
                                }
                                if (w[x].substring(2, 5) === "adv") {
                                    var tcg = w[x].substring(indexcheck, length)
                                }
                                if (w[x].substring(2, 5) === "ocg") {
                                    var ocg = w[x].substring(indexcheck, length)
                                }
                                if (w[x].substring(2, 8) === "number") {
                                    var number = w[x].substring(indexcheck, length)
                                }
                                if (w[x].substring(2, 7) === "level") {
                                    var level = w[x].substring(indexcheck, length)
                                }
                                if (w[x].substring(2, 6) === "rank") {
                                    var rank = w[x].substring(indexcheck, length)
                                }
                                if (w[x].substring(2, 5) === "atk") {
                                    var atk = w[x].substring(indexcheck, length)
                                }
                                if (w[x].substring(2, 5) === "def") {
                                    var def = w[x].substring(indexcheck, length)
                                }
                                if (w[x].substring(2, 6) === "lore") {
                                    var effect = w[x].substring(indexcheck, length)
									effect = effect.replace(/\[\[[^((?!\[).)]*\|/g, "")
									effect = effect.replace(/[\[\]]/g,"")
									effect = effect.replace(/\<br \/\>/g, br)
                                }
								if (w[x].substring(2, 17) === "pendulum_effect") {
                                    var pendulum_effect = w[x].substring(indexcheck, length)
									pendulum_effect = pendulum_effect.replace(/\[\[[^((?!\[).)]*\|/g, "")
									pendulum_effect = pendulum_effect.replace(/[\[\]]/g,"") 
                                }
								if (w[x].substring(2, 7) === "image") {
                                    var fullimage = w[x].substring(indexcheck, length)
                                }
								if (w[x].substring(2, 16) === "pendulum_scale") {
                                    var pendulum_scale = w[x].substring(indexcheck, length)
                                }
								if (w[x].substring(2, 8) === "effect") {
                                    var category = w[x].substring(indexcheck, length)
                                }
                            };
							var dblevel
							var dblevelint = "0"
							if (level !== undefined) {
								var dblevelint = level
							}
							if (level !== undefined && pendulum_scale !== undefined) {
								var hexlevel = level.toString(16);
								var hexscale = pendulum_scale.toString(16);
								var dblevel = hexscale + "0" + hexscale + "000" + hexlevel
								var dblevelint = parseInt(dblevel, 16);
								}
				//Debugging
					
					console.log("Card name = "+wikiacard)
					console.log("Type = "+type)
					console.log("Attribute = "+attribute)
				// End of debugging
				if (attribute.indexOf("Spell") < 0 && attribute.indexOf("Trap") < 0 && type.indexOf("Effect") < 0) {
								type = "Normal" + "/" + type
							}
							var fullcard = {
    id:number,
	name:name,
	pic: 'http://yugioh.wikia.com/wiki/File:'+fullimage,
	wikia: 'http://yugioh.wikia.com/wiki/' + name.replace(/ /g, "_"),
	category: category,
    attribute:attribute,
    type:type,
	dblevel:dblevelint,
	level:level,
	rank:rank,
	atk:atk,
	def:def,
	effect:effect,
	pendulum_effect:pendulum_effect,
	pendulum_scale:pendulum_scale,
	tcg:tcg,
	ocg:ocg
	};
							return fullcard;
j++;
    if( j < howManyTimes ){
        setTimeout( g(body), timeout );
    }
};