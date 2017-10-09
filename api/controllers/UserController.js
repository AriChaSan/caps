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

	showUser: function(req, res) {
		User.findOne(req.params.id).populateAll().exec(function(err, user) {

			if(err) {
				return res.serverError(err);
			}
			
			return res.json(user);
		});
	},

	changePassword: function(req, res) {

		var data = req.param('data');
		console.log(data);
		User.update({id: req.params.id}, {password: data.newPassword}).exec(function(err, user) {

			if(err) {
				return res.serverError(err);
			}
			
			return res.json(user);
		});
	},

	showEmployee: function(req, res) {
		Employee.findOne(req.params.id).populateAll().exec(function(err, employee) {

			if(err) {
				return res.serverError(err);
			}
			
			return res.json(employee);
		});
	},

	showEmployeeList: function(req, res) {

		User.find({account_type_id: [1, 2, 3]}).exec(function(err, users) {
			// body...
			var usersId = _.pluck(users, 'id');
			Employee.find({account_id: usersId})
			.populate('account_id.account_type_id')
			.populate('physical_description')
			.populate('address')
			.populate('emergency')
			.populate('parent')
			.populate('sibling')
			.populate('education_background')
			.populate('employee_type_id')
			.exec(function(err, employee) {

				if(err) {
					return res.serverError(err);
				}
				
				return res.json(employee);
			});
		})	
	},

	create: function(req, res) {
		console.log(req.param('data'));
		var data = req.param('data');
		if(data.account.account_type_id == 4 || data.account.account_type_id == 5) {

			User.create(data.account).exec(function(err, user) {
				var employee = {
		          id_number: data.personal.id_number,
		          firstname: data.personal.firstname,
		          middlename: data.personal.middlename,
		          lastname: data.personal.lastname,
		          qualifier: data.personal.qualifier,
		          account_id: user.id,
		          employee_type_id: data.personal.employee_type_id
		        };

				Employee.create(employee).exec(function(err, employee) {}); 
			});
		} else {

			User.create(data.account).exec(function(err, user) {
				var employee = {
		          id_number: data.personal.id_number,
		          firstname: data.personal.firstname,
		          middlename: data.personal.middlename,
		          lastname: data.personal.lastname,
		          qualifier: data.personal.qualifier,
		          account_id: user.id,
		          employee_type_id: data.personal.employee_type_id
		        };

				Employee.create(employee).exec(function(err, employee) {
		            
		          Address.create({employee_id: employee.id}).exec(function(err, address) {});
		          Emergency.create({employee_id: employee.id}).exec(function(err, address) {});
		          Physical_Description.create({employee_id: employee.id}).exec(function(err, physical_Description) {});

		          var parent = [
		            {
		              parent_type: 'father',
		              employee_id: employee.id
		            },
		            {
		              parent_type: 'mother',
		              employee_id: employee.id
		            }
		          ];

		          Parent.create(parent).exec(function(err, parent) {});

		          var sibling = [
		            {
		              employee_id: employee.id
		            },
		            {
		              employee_id: employee.id
		            },
		            {
		              employee_id: employee.id
		            },
		            {
		              employee_id: employee.id
		            }
		          ];

		          Sibling.create(sibling).exec(function(err, sibling) {});

		          var education = [
		            {
		              education_type: 'elementary',
		              employee_id: employee.id
		            },
		            {
		              education_type: 'highschool',
		              employee_id: employee.id
		            },
		            {
		              education_type: 'college',
		              employee_id: employee.id
		            },
		            {
		              education_type: 'post_graduate',
		              employee_id: employee.id
		            }
		          ];

		          Education_Background.create(education).exec(function(err, education_background) {});
		        }); 
			});
		}
	},

	update: function(req, res) {
		//var mimeType = req.file('file')._readableState.buffer.head.data.filename.split('.');
		//mimeType = _.last(mimeType);
		var data = JSON.parse(req.param('data')).employee;
		console.log(data);
		var userId = req.params.id;
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

		var cloudinaryConfig = {
		      adapter  : require('skipper-cloudinary'),
		      key      : '621888631475351',
		      secret   : 'UPaA26iv-O9yDqfFpcSIAf1Lg28',
		      cloudName: 'capstoneimg',
		      uploadOptions: {
		        folder: 'image'
		      },
		      maxBytes: 10000000
		    };

		req.file('file').upload(config, function (err, uploadedFiles){
			console.log(uploadedFiles);
		  if(err){
		    return res.json(500, {message: 'Too big'});
		  }
		  else if(uploadedFiles.length === 0){
		    // proceed without files
		   	uploadNoImage(data, userId);
		   	return res.json(200, 'success');
		  }
		  else{
		    //  handle uploaded file
		    //filename = uploadedFiles[0].extra.url;
		    uploadWithImage(data, filename, userId);
		    return res.json(200, 'success');
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

function uploadNoImage(data, userid) {
	console.log(data);
	Employee.update({account_id: userid}, data.personal).exec(function(err, employee) {
		Address.update({employee_id: employee[0].id}, data.emergency).exec(function(err, address) {});
		Emergency.update({employee_id: employee[0].id}, data.emergency).exec(function(err, emergency) {});
		Physical_Description.update({employee_id: employee[0].id}, data.physical_description).exec(function(err, physical_description) {});
		Parent.update({id: data.parent[0].id}, data.parent[0]).exec(function(err, parent) {});
		Parent.update({id: data.parent[1].id}, data.parent[1]).exec(function(err, parent) {});
		Sibling.update({id: data.sibling[0].id}, data.sibling[0]).exec(function(err, parent) {});
		Sibling.update({id: data.sibling[1].id}, data.sibling[1]).exec(function(err, parent) {});
		Sibling.update({id: data.sibling[2].id}, data.sibling[2]).exec(function(err, parent) {});
		Sibling.update({id: data.sibling[3].id}, data.sibling[3]).exec(function(err, parent) {});
		Education_Background.update({id: data.education_background[0].id}, data.education_background[0]).exec(function(err, parent) {});
		Education_Background.update({id: data.education_background[1].id}, data.education_background[1]).exec(function(err, parent) {});
		Education_Background.update({id: data.education_background[2].id}, data.education_background[2]).exec(function(err, parent) {});
		Education_Background.update({id: data.education_background[3].id}, data.education_background[3]).exec(function(err, parent) {});
	});
}

function uploadWithImage(data, filename, userid) {
	data.personal.image = filename;
	console.log(data);
	Employee.update({account_id: userid}, data.personal).exec(function(err, employee) {
		Address.update({employee_id: employee[0].id}, data.emergency).exec(function(err, address) {});
		Emergency.update({employee_id: employee[0].id}, data.emergency).exec(function(err, emergency) {});
		Physical_Description.update({employee_id: employee[0].id}, data.physical_description).exec(function(err, physical_description) {});
		Parent.update({id: data.parent[0].id}, data.parent[0]).exec(function(err, parent) {});
		Parent.update({id: data.parent[1].id}, data.parent[1]).exec(function(err, parent) {});
		Sibling.update({id: data.sibling[0].id}, data.sibling[0]).exec(function(err, parent) {});
		Sibling.update({id: data.sibling[1].id}, data.sibling[1]).exec(function(err, parent) {});
		Sibling.update({id: data.sibling[2].id}, data.sibling[2]).exec(function(err, parent) {});
		Sibling.update({id: data.sibling[3].id}, data.sibling[3]).exec(function(err, parent) {});
		Education_Background.update({id: data.education_background[0].id}, data.education_background[0]).exec(function(err, parent) {});
		Education_Background.update({id: data.education_background[1].id}, data.education_background[1]).exec(function(err, parent) {});
		Education_Background.update({id: data.education_background[2].id}, data.education_background[2]).exec(function(err, parent) {});
		Education_Background.update({id: data.education_background[3].id}, data.education_background[3]).exec(function(err, parent) {});
	});
}

