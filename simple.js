var bills = [1, 5, 10, 15, 20, 30, 40, 50, 60, 100];
var diff
for (var i = 0, len = 1000; i < len; i++) {
diff = diff + bills + bills + bills + bills + bills + bills + bills + bills + bills 
}
for (var i = 0, len = diff.length; i < len; i++) {
console.log(i)
}