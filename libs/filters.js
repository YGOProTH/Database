exports.filterByFormat = function filterByFormat(cardobj,value) {
  var tempval = cardobj.filter(function (c) {
    return c.ot === value;
})
  return tempval;
}
exports.filterByType = function filterByType(cardobj,value) {
    var tempval = cardobj.filter(function (c) {
    return c.type === value;
})
  return tempval;
}
exports.filterByAttribute = function filterByAttribute(cardobj,value) {
    var tempval = cardobj.filter(function (c) {
    return c.attribute === value;
})
  return tempval;
}
exports.filterByRace = function filterByRace(cardobj,value) {
    var tempval = cardobj.filter(function (c) {
    return c.race === value;
})
  return tempval;
}
exports.filterByLevel = function filterByLevel(cardobj,value) {
    var tempval = cardobj.filter(function (c) {
    return c.level === value;
})
  return tempval;
}
exports.filterByLscale = function filterByLscale(cardobj,value) {
    var tempval = cardobj.filter(function (c) {
    return c.lscale === value;
})
  return tempval;
}
exports.filterByRscale = function filterByRscale(cardobj,value) {
    var tempval = cardobj.filter(function (c) {
    return c.rscale === value;
})
  return tempval;
}
exports.filterByType = function filterByDesc(cardobj,value) {
  var tempval = cardobj.filter(function (c) {
    return ((c.desc).indexOf(value) > -1);
})
  return tempval;
}
exports.filterByAtk = function filterByAtk(cardobj,value) {
    var tempval = cardobj.filter(function (c) {
    return c.atk === value;
})
  return tempval;
}
exports.filterByDef = function filterByDef(cardobj,value) {
    var tempval = cardobj.filter(function (c) {
    return c.def === value;
})
  return tempval;
}
exports.filterByName = function filterByName(cardobj,value) {
  var tempval = cardobj.filter(function (c) {
    return ((c.desc).indexOf(value) > -1);
})
  return tempval;
}
exports.filterById = function filterById(cardobj,value) {
    var tempval = cardobj.filter(function (c) {
    return c.id === value;
})
  return tempval;
}
exports.filterBySetname = function filterBySetname(cardobj,value) {
    var tempval = cardobj.filter(function (c) {
    return c.setname === value;
})
  return tempval;
}