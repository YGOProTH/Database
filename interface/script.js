$('#get-data').click(function () {
  $.getJSON('https://github.com/YGOWeb/Database/blob/master/dbs/DevPro.json?raw=true', function (data) {
    console.log(data);
  });
});