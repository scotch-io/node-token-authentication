// get the packages we need ========================================
var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');

// used to create, sign, and verify tokens
var jwt         = require('jsonwebtoken');

// configuration ===================================================
// set the port
var port = process.env.PORT || 8080;

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes ==========================================================
var info = {
	user: 'Chris Sevilleja',
	admin: true
};

var token = jwt.sign(info, 'ilovescotchyscotch', {
	issuer: 1, // user id
	expiresInMinutes: 1440 // expires in 24 hours
});

// basic route
app.get('/', function(req, res) {
	res.send('Hello! The magic happens at http://localhost:' + port + '/api');
});

// get an instance of the router
var apiRoutes = express.Router();

// authentication (no middleware necessary since this isnt authenticated)
apiRoutes.post('/authenticate', function(req, res) {
	console.log(req.params);
});

// route middleware to authenticate and check token
apiRoutes.use(function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers['x-access-token'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, 'ilovescotchyscotch', function(err, decoded) {
			console.log(decoded);

			// if everything is good, save to request for use in other routes
			req.decoded = decoded;

			if (err) {
				res.end('error', 400);
			}
		});

	}

	next();
});

apiRoutes.get('/', function(req, res) {
	res.send(token);
});

apiRoutes.get('/check', function(req, res) {
	res.json(req.decoded);
});

app.use('/api', apiRoutes);

// start the server
app.listen(port);