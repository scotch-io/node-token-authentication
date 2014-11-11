// get the packages we need ========================================
var express 	= require('express');
var app         = express();

// used to create, sign, and verify tokens
var jwt         = require('jsonwebtoken');

// configuration ===================================================
// set the port
var port = process.env.PORT || 8080;

// routes ==========================================================

var token = jwt.sign({ user: 'chris' }, 'ilovescotchyscotch');
jwt.verify(token, 'ilovescotchyscotch', function(err, decoded) {
	console.log(decoded);
	var verified = decoded;
});

app.get('/', function(req, res) {
	res.send(token);
});

app.get('/check', function(req, res) {
	console.log(decoded);
	res.send('hello');
});

// start the server
app.listen(port);