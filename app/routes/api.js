// Holds the main functionality of the app and links to the db

var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = 'cheese';

module.exports = function(router) {

	//http://localhost:8080/api/users
	router.post('/users', function(req, res) {
		var user = new User();
		user.username = req.body.username;
		user.password = req.body.password;
		user.email = req.body.email;
		if (req.body.username == null || req.body.password == null || req.body.email == null || req.body.username == '' || req.body.password == '' || req.body.email == '') {
			res.json({ success: false, message: 'Ensure username, password and email have been provided' });
		} else {
			user.save(function(err) {
			if (err) {
				res.json({ success: false, message: 'Username or Email already exists' });
			} else {
				res.json({ success: true, message: 'user created!' });
			}
		});
		}
		
	});

	router.post('/authenticate', function(req, res) {
		User.findOne({ username: req.body.username }).select('email username password').exec(function(err, user) {
			if (err) throw err;

			if (!user) {
				res.json({ success: false, message: 'Could not authenticate user' });
			} else if (user) {
				if (req.body.password) {
					var validPassword = user.comparePassword(req.body.password);
				} else {
					res.json({ success: false, message: 'No password entered' });
				}
				if (!validPassword) {
					res.json({ success: false, message: 'Could not authenticate password' });
				} else {
					var token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '1h' });
					res.json({ success: true, message: 'User authenticated', token: token });
				}
			}
		});
	});

	router.use(function(req, res, next) {

		var token = req.body.token || req.body.query || req.header['x-access-token'];

		if (token) {
			jwt.verify(token, secret, function(err, decoded) {
				if (err) {
					res.json({ success: false, message: 'Token invalid' });
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} else {
			res.json({ success: false, message: 'No token provided' });
		}

	});

	router.post('/currentUser', function(req, res) {
		res.send(req.decoded);
	});

	return router;
};












