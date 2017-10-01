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

		Employee.findOne(req.params.id).populateAll().exec(function(err, employee) {
			if(err) {
				return res.serverError(err);
			}
			
			return res.json(employee);
		});
	},

	create: function(req, res) {

		Employee.findOne(req.params.id).populateAll().exec(function(err, employee) {
			if(err) {
				return res.serverError(err);
			}
			
			return res.json(employee);
		});
	},

	update: function(req, res) {
		//var mimeType = req.file('file')._readableState.buffer.head.data.filename.split('.');
		//mimeType = _.last(mimeType);
		var now = new Date();
	    now = now.getTime();
	    var filename = "";
		var config = {
			dirname: require('path').resolve(sails.config.appPath, 'assets/images'),
			saveAs: function(file, cb) {

			 		var extension = file.filename.split('.').pop();
			 	    filename = now + '.' +extension;
			 		cb(null, filename);
			 	},
			maxBytes: 10000000
		};

		req.file('file').upload(config, function (err, uploadedFiles){
		  if(err){
		    return res.json(500, err);
		  }
		  else if(uploadedFiles.length === 0){
		    // proceed without files
		    var data = JSON.parse(req.param('data')).employee;
		    console.log(data);
		    Employee.update({account_id: req.params.id}, data.personal).exec(function(err, employee) {
		    	//console.log(employee);
		    	Address.update({employee_id: employee[0].id}, data.emergency).exec(function(err, address) {
		    		
		    	});

		    	Emergency.update({employee_id: employee[0].id}, data.emergency).exec(function(err, emergency) {
		    		
		    	});

		    	Physical_Description.update({employee_id: employee[0].id}, data.physical_description).exec(function(err, physical_description) {
		    		
		    	});

		    	Parent.update({id: data.parent[0].id}, data.parent[0]).exec(function(err, parent) {
		    		
		    	});

		    	Parent.update({id: data.parent[1].id}, data.parent[1]).exec(function(err, parent) {
		    		
		    	});

		    	Sibling.update({id: data.sibling[0].id}, data.sibling[0]).exec(function(err, parent) {
		    		
		    	});

		    	Sibling.update({id: data.sibling[1].id}, data.sibling[1]).exec(function(err, parent) {
		    		
		    	});

		    	Sibling.update({id: data.sibling[2].id}, data.sibling[2]).exec(function(err, parent) {
		    		
		    	});

		    	Sibling.update({id: data.sibling[3].id}, data.sibling[3]).exec(function(err, parent) {
		    		
		    	});

		    	Education_Background.update({id: data.education_background[0].id}, data.education_background[0]).exec(function(err, parent) {
		    		
		    	});

		    	Education_Background.update({id: data.education_background[1].id}, data.education_background[1]).exec(function(err, parent) {
		    		
		    	});

		    	Education_Background.update({id: data.education_background[2].id}, data.education_background[2]).exec(function(err, parent) {
		    		
		    	});

		    	Education_Background.update({id: data.education_background[3].id}, data.education_background[3]).exec(function(err, parent) {
		    		
		    	});

		    });
		  }
		  else{
		    //  handle uploaded file
		    var data = JSON.parse(req.param('data')).employee;
		    data.personal.image = filename;
		    console.log(data);
		    Employee.update({account_id: req.params.id}, data.personal).exec(function(err, employee) {
		    	//console.log(employee);
		    	Address.update({employee_id: employee[0].id}, data.emergency).exec(function(err, address) {
		    		
		    	});

		    	Emergency.update({employee_id: employee[0].id}, data.emergency).exec(function(err, emergency) {
		    		
		    	});

		    	Physical_Description.update({employee_id: employee[0].id}, data.physical_description).exec(function(err, physical_description) {
		    		
		    	});

		    	Parent.update({id: data.parent[0].id}, data.parent[0]).exec(function(err, parent) {
		    		
		    	});

		    	Parent.update({id: data.parent[1].id}, data.parent[1]).exec(function(err, parent) {
		    		
		    	});

		    	Sibling.update({id: data.sibling[0].id}, data.sibling[0]).exec(function(err, parent) {
		    		
		    	});

		    	Sibling.update({id: data.sibling[1].id}, data.sibling[1]).exec(function(err, parent) {
		    		
		    	});

		    	Sibling.update({id: data.sibling[2].id}, data.sibling[2]).exec(function(err, parent) {
		    		
		    	});

		    	Sibling.update({id: data.sibling[3].id}, data.sibling[3]).exec(function(err, parent) {
		    		
		    	});

		    	Education_Background.update({id: data.education_background[0].id}, data.education_background[0]).exec(function(err, parent) {
		    		
		    	});

		    	Education_Background.update({id: data.education_background[1].id}, data.education_background[1]).exec(function(err, parent) {
		    		
		    	});

		    	Education_Background.update({id: data.education_background[2].id}, data.education_background[2]).exec(function(err, parent) {
		    		
		    	});

		    	Education_Background.update({id: data.education_background[3].id}, data.education_background[3]).exec(function(err, parent) {
		    		
		    	});
		    });
		  }
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

function upload(file, filename) {
		var config = {
			dirname: require('path').resolve(sails.config.appPath, 'assets/images'),
			saveAs: filename
		};

		file.upload(config, function (err, uploadedFiles) {
		  // ...\
			if(err) {
				console.log(err);
			}
			console.log(uploadedFiles);
		});
}

