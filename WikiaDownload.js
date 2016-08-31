var fs = require("fs"); //filewriting/reading library
var request = require('request'); //https://www.npmjs.com/package/request
var legalwikia = 'http://yugioh.wikia.com/api/v1/Articles/List?category=TCG_cards&category=OCG_cards&limit=1000000&namespaces=0'
var animewikia = 'http://yugioh.wikia.com/api/v1/Articles/List?category=Anime%20cards&limit=1000000&namespaces=0'
var ygoprotcg = 'http://yugioh.wikia.com/api/v1/Articles/List?category=TCG_cards&limit=1000000&namespaces=0'
var ygoproocg = 'http://yugioh.wikia.com/api/v1/Articles/List?category=OCG_cards&limit=1000000&namespaces=0'
var debugurl = 'http://yugioh.wikia.com/api.php?action=query&format=txt&redirects&prop=revisions&rvprop=content&titles=Damage Vaccine Ω MAX'
				request(debugurl, function(error, response, body) {
					//Regex {"items":|\,\"basepath":"http:\\\/\\\/yugioh.wikia.com"\}
						fs.writeFile("./db/rawwikia.json", body)
						console.log(debugurl)
				})
					request(legalwikia, function(error, response, body) {
					body = body.replace(/{"items":|\,\"basepath":"http:\\\/\\\/yugioh.wikia.com"\}/g,"")
					//Regex {"items":|\,\"basepath":"http:\\\/\\\/yugioh.wikia.com"\}
						fs.writeFile("./db/legalwikia.json", body)
				})
				
				request(ygoprotcg, function(error, response, body) {
					body = body.replace(/{"items":|\,\"basepath":"http:\\\/\\\/yugioh.wikia.com"\}/g,"")
					//Regex {"items":|\,\"basepath":"http:\\\/\\\/yugioh.wikia.com"\}
						fs.writeFile("./db/TCGLegal.json", body)
				})
				
				request(ygoproocg, function(error, response, body) {
					body = body.replace(/{"items":|\,\"basepath":"http:\\\/\\\/yugioh.wikia.com"\}/g,"")
					//Regex {"items":|\,\"basepath":"http:\\\/\\\/yugioh.wikia.com"\}
						fs.writeFile("./db/OCGLegal.json", body)
				})
				