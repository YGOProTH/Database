var fs = require("fs"); //filewriting/reading library
var SQL = require('sql.js'); // npm install sql.js
var dbfile = "prerelease.cdb";
var savepath = __dirname + "\\dbs\\prerelease.json"
var mycards = getcards(dbfile) 
//console.log(mycards[1]) 
fs.writeFile(savepath, JSON.stringify(mycards));

function getcards(file) {
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