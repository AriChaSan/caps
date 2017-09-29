/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	index: function(req, res) {
		User.find().populate(['account_type_id', 'employee']).exec(function(err, user) {
			if(err) {
				return res.serverError(err);
			}
			
			return res.json(user);
		});
	},

	show: function(req, res) {

		Employee.findOne(req.params.id).exec(function(err, employee) {
			if(err) {
				return res.serverError(err);
			}
			
			return res.json(employee);
		});
	},

	update: function(req, res) {

		req.file('file').upload(function (err, uploadedFiles) {
		  // ...\
			if(err) {
				console.log(err);
			}

			console.log(uploadedFiles);
		});
	},

	login: function(req, res) {

		var error = [];

		if(req.param('username') == "" || req.param('username') == undefined) {

			error.push('Username is required.');
		};

		if(req.param('password') == "" || req.param('password') == undefined) {

			error.push('Password is required.');
		};

		if(error.length != 0) {
			return res.json(404, {errors: error});
		};

		User.findOne({username: req.param('username')}).populate('account_type_id').exec(function(err, user) {

			if(err) {

				return res.json(500, err);
			};

			if(user == undefined || user.length > 0) {

				error.push('Username does not exist.');
				return res.json(404, {errors: error});
			};

			var bcrypt = require('bcryptjs');
			//var salt = bcrypt.genSaltSync(10);
			//var hash = bcrypt.hashSync(req.param, salt);

			var checkPwd = bcrypt.compareSync(req.param('password'), user.password);

			if(!checkPwd) {

				error.push('Password is invalid.');
				return res.json(404, {errors: error}); 
			};
			
			req.session.User = user;
			req.session.authenticated = true;

			console.log(req.session);

			return res.json(200, user)
		});
	},

	logout: function(req, res) {

		var date = new Date();
		req.session.cookie.expires = new Date(date.getTime() - 999999);

		return res.json(200, {message: 'logged out'});
	}
};

