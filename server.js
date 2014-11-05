// get the packages we need ========================================
var express 	= require('express'),
	app         = express(),
	expressJWT  = reqiure('express-jwt'),
	jwt         = require('jsonwebtoken');

// configuration ===================================================

// set the port
var port = process.env.PORT || 8080;

// configure app to use json
app.use(express.json());

// configure app to urlencode
app.use(express.urlencoded());
