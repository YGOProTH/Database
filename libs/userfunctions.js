"use strict";
exports.parseCardData = function parseCardData(thisinfo) {
    var here = require("./userfunctions.js") // Use functions in same functions file
    var thiscarddata = {
        type: "",
        attribute: "",
        race: "",
        level: "",
        lscale: "",
        rscale: "",
        desc: thisinfo.desc,
        atk: thisinfo.atk,
        def: thisinfo.def,
        name: thisinfo.name,
        id: thisinfo.id,
        format: "",
        setcode: ""
    };
        if (thiscarddata.atk == -2) {
		thiscarddata.atk = "?"
    }
    if (thiscarddata.def == -2) {
        thiscarddata.def = "?"
    }
        
    var thislevel = here.parselevel(thisinfo.level)
    thiscarddata.level = thislevel.level
    thiscarddata.lscale = thislevel.lscale
    thiscarddata.rscale = thislevel.rscale
    thiscarddata.setcode = here.getSetname(thisinfo.setcode);
    thiscarddata.format = here.getCardData("format",thisinfo.ot);
    thiscarddata.race = here.getCardData("race",thisinfo.race);
    thiscarddata.attribute = here.getCardData("attribute",thisinfo.attribute);
    return thiscarddata;
}

exports.getCardData = function getCardData(category,val) {
    var desc = require("../desc/cardlibs.js"); // Card Library
    if (desc[category][val] === undefined) {
        return "None";
        }
    return desc[category][val];
    //return desc[category][val];
};

exports.imgserver = function imgserver(funcID) {
var express = require('express');
var app = express();
var url = "/" + "images" + "/" + funcID

var imgstart = "<img id=\"ygoimg\" src=\"https:\/\/github.com\/SalvationDevelopment\/YGOPro-Images\/blob\/master\/"
var imgend = "?raw=true\" alt=\"Sangan\" width=\"174\" height=\"255\" /><br>"
var ext = ".jpg"
var htmlstart= "<html><body><p>"
var htmlend= "</p><\/body><\/html>"
var fullhtml = htmlstart + imgstart + funcID + ext + imgend + htmlend
console.log(url)
app.get(url, function (req, res) {
  res.send(fullhtml);
});

app.listen(2000, function () {
  console.log('Example app listening on port 2000!');
});
};

exports.webserver = function webserver(content,urlpath,url) {
var express = require('express');
var app = express();
var url = "/" + urlpath + "/" + url

app.get(url, function (req, res) {
  res.send(content);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
};





exports.reverse = function reverse(a) {
    var temp = a,
        i = 0,
        j = a.length - 1,
        x;
    
    while (i < j) {
        x = a[i];
        a[i] = a[j];
        a[j] = x;
        i += 1;
        j -= 1;
    }
    return a;
};

exports.parselevel = function parselevel(lvl) {
    var cd = {
            level: 0,
            lscale: 0,
            rscale: 0
	    };
    cd.level = lvl & 0xff;
    cd.lscale = (lvl >> 24) & 0xff;
    cd.rscale = (lvl >> 16) & 0xff;
    return cd;
};

exports.getcards = function getcards(dir, file) {
    var fs = require('fs'); //filewriting/reading library
    var filebuffer = fs.readFileSync(dir + file),
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
};

exports.getByName = function getByName(thisdb, query) {
    var i;
    for (i = 0; i < thisdb.length; i += 1) {
        if (thisdb[i].name.toLowerCase() === query.toLowerCase()) {
            return thisdb[i];
        }
    }
    return "";
};

exports.TextConvert = function TextConvert(amount, hex) { // Greedy Algorithm to divide Hex groups
    "use strict";
    var here = require("./userfunctions.js") // Use functions in same functions file
    var diff = [],
        total = 0,
        tempkey = here.reverse(Object.keys(hex));
    tempkey.forEach(function (nums) {
        nums = parseInt(nums, 10); 
        while (total + nums <= amount) {
            if (total + nums <= 0) {
            break;
            }
            diff.push(nums);
            total += nums;
        }
    });
    return diff;
}

exports.getSetname = function getSetname(sc) {
    'use strict';
    var setname = require("../desc/setcodes.js"); 
    var i,
        formatsetnames = [],
        setnames = [],
        setcodes = [ sc & 0xffff,
            sc >> 16 & 0xffff,
            sc >> 32 & 0xffff,
            sc >> 64 & 0xffff],
        usetcodes = setcodes.filter(function (item, pos) {
            setnames.push(setname.setcodes[item])
        });
for (i = 0; 4 > i; i++) {
    if (i === 0) {
        formatsetnames.push(setnames[i])
    }
    if (setnames[0] !== setnames[i]) {
        formatsetnames.push(setnames[i])
    }
}
 if (formatsetnames.length > 1) {
       for (i = 0; formatsetnames.length > i; i++) {
    if (formatsetnames[i] === "None") {
        formatsetnames.splice(i, i);    
    }
    
}
    }
//console.log(formatsetnames)
return formatsetnames;
}

exports.getType = function getType(info,thiscard) {
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

exports.download = function (url, path) {
    var fs = require('fs');
    var request = require('request');    
    request({uri: url})
      .pipe(fs.createWriteStream(path))
};


/*exports.findContainsCard = function findCard(thisdb, query) {
    var i;
    for (i = 0; i < thisdb.length; i += 1) {
        if (thisdb[i].name.toLowerCase() === query.toLowerCase()) {
            return thisdb[i];
        }
    }
    return "";
};*/