// server.js
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

app = express();
app.use(serveStatic(__dirname + "/public"));

var port = process.env.PORT || 3000;
app.listen(port);
//app.set('port', 3000)

console.log('server started ' + port);
