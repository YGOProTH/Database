var jQuery = require('jquery-deferred'); // npm install jquery-deferred
var fs = require("fs"); //filewriting/reading library
var request = require('request'); //https://www.npmjs.com/package/request
var SQL = require('sql.js'); // npm install sql.js
var dbdir = __dirname + "\\db\\"
var remotefile = 'https://raw.githubusercontent.com/Bromantic/YGOPro-Web/master/cards.json'
request(remotefile, function (error, response, body) {
  if (!error && response.statusCode == 200) {
	var webdb = JSON.parse(body)
	console.log(webdb[1].name)
	/* for(var i = 0; i < webdb.length; i++){
        if(webdb[i].id == query){
            return dbdatas[i];
        }
    } */
  }
})




//Credit goes to https://github.com/SalvationDevelopment/YGOPro-Salvation-Server/blob/master/libs/update.js#L211
function getcards(file) {
    var filebuffer = fs.readFileSync( + file),
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

    return JSON.parse(output);
}
