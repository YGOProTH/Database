exports.reverse = function reverse(a) {
    var temp = a
    var i = 0;
    var j = a.length - 1;
    while (i < j) {
        var x = a[i];
        a[i] = a[j];
        a[j] = x;
        i++;
        j--;
    }
    return a;
}

exports.parselevel = function parselevel(rawlevel) {
var cardinfo = {
lscale: "",
rscale: "",
level: ""
}
var cardlvl = Math.floor(rawlevel)
if (isNaN(cardlvl) === true) {
cardinfo.level = 0
cardinfo.lscale = 0
cardinfo.rscale = 0
return cardinfo;
}
var hex = cardlvl.toString(16);
if (hex.length < 7) {
cardinfo.level = cardlvl
cardinfo.lscale = 0
cardinfo.rscale = 0
return cardinfo;
}
lvlcheck = cardlvl

cardinfo.lscale = parseInt(hex.substring(0, 1), 16)
cardinfo.rscale = parseInt(hex.substring(2, 3), 16)
cardinfo.level = parseInt(hex.substring(6, 7), 16)
//alert(hex.substring(0, 1)+" and "+hex.substring(2, 3)+" and "+hex.substring(6, 7))
//alert(cardinfo.lscale+" and "+cardinfo.rscale)
return cardinfo;
};