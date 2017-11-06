/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment =  require('moment');
module.exports = {
	
	index: function(req, res) {
		User.find().populate(['account_type_id', 'employee']).exec(function(err, user) {

			if(err) {
				return res.serverError(err);
			}	

			return res.json(user);
		});
	},

	keyChange: function(req, res) {
		Employee_Attendance.findOne(req.params.id).exec(function(err, employee) {
			if(err) {
					return res.serverError(err);
				}	

				return res.json(employee);
		});
	},

	postKeyChange: function(req, res) {
		TimeKey.create(req.param('data')).exec(function(err, time) {
			if(err) {
					return res.serverError(err);
				}	

				return res.json(time);
		});
	},

	allRecord: function(req, res) {
		User.find({account_type_id:[1, 2, 3]}).exec(function(err, user) {
			var usersId = _.pluck(user, 'id');
			Employee.find({account_id: usersId}).populate('employee_attendance').exec(function(err, employee) {
				if(err) {
					return res.serverError(err);
				}	

				return res.json(employee);
			});
		});
		
	},

	employeeDTR: function(req, res) {
		Employee.findOne(req.params.id).populate('employee_attendance').exec(function(err, user) {
			if(err) {
				return res.serverError(err);
			}	

			return res.json(user);
		});
	},

	employeeAttendanceSummary: function(req, res) {

		User.find({account_type_id:[1, 2, 3]}).exec(function(err, user) {
			var usersId = _.pluck(user, 'id');
			Employee.find({account_id: usersId}).populate('employee_attendance').exec(function(err, user) {

				if(err) {
					return res.serverError(err);
				}	

				return res.json(user);
			});
		});
		
	},

	employeeAbsenceReport: function(req, res) {
		User.find({account_type_id:[1, 2, 3]}).exec(function(err, user) {
			var usersId = _.pluck(user, 'id');
			Employee.find({account_id: usersId}).populate('leave_credit').populate('leave', {status: 'accepted'}).exec(function(err, user) {

				if(err) {
					return res.serverError(err);
				}	

				return res.json(user);
			});
		});
		
	},

	employeeAbsenceReportDetail: function(req, res) {
		Leave.find({employee_id: req.params.id, status: {'!': 'pending'}}).populate('employee_id.location_id').populate('employee_id.employee_type_id').exec(function(err, leave) {
			if(err) {
				return res.serverError(err);
			}	

			return res.json(leave);
		});
	},

	showEmployeeAttendance: function(req, res) {

		Employee_Attendance.find({employee_id: req.params.id}).exec(function(err, user) {

			if(err) {
				return res.serverError(err);
			}	

			return res.json(user);
		});
	},

	requestLeave: function(req, res) {

		var leave = req.param('data');

		var data = {
			leave_type: leave.type,
			leave_days: leave.days,
			leave_vacation: leave.leave_vacation,
			sick_vacation: leave.sick_vacation,
			reason: leave.reason,
			date_from: moment(leave.date_from).format('l'),
			date_to: moment(leave.date_tos).format('l'),
			employee_id: req.params.id
		};

		Leave.create(data).exec(function(err, leave) {
			if(err) {
				return res.serverError(err);
			}	
			return res.json(leave);
		});
		//console.log(req.param('data'));
	},

	viewLeaveCredit: function(req, res) {

		Leave_Credit.findOne({employee_id: req.params.id}).exec(function(err, leave_credit) {
			if(err) {
				return res.serverError(err);
			}	
			return res.json(leave_credit);
		});
	},

	viewRequestLeave: function(req, res) {

		Leave.find({status: 'pending'}).sort('createdAt DESC').populate('employee_id').exec(function(err, leave) {
			

			TimeKey.find({status: 'pending'}).sort('createdAt DESC').populate('employee_id').exec(function(err, timekey) {
				if(err) {
					return res.serverError(err);
				}

				var data = [];

				var newLeave = _.map(leave, function(value, index) {

					value.reqType = 'leave';
					return value;
				});	

				var newTimeKey = _.map(timekey, function(value, index) {

					value.reqType = 'timekey';
					return value;
				});

				_.each(newLeave, function(value, index) {

					data.push(value);
				});


				_.each(newTimeKey, function(value, index) {

					data.push(value);
				});		
				return res.json(data);
			});
			
		});
		//console.log(req.param('data'));
	},

	viewOneTimeKey: function(req, res) {

		TimeKey.findOne(req.params.id).populate('employee_id').exec(function(err, leave) {
			if(err) {
				return res.serverError(err);
			}

			return res.json(leave);
		});
		//console.log(req.param('data'));
	},

	acceptTimeKey: function(req, res) {

		TimeKey.update({id: req.params.id}, {status: 'accepted'}).exec(function(err, leave){
			if(err) {
				return res.serverError(err);
			}

			var data = {
				timeIn: leave[0].newTimeIn,
				timeOut: leave[0].newTimeOut
			};

			Employee_Attendance.update({id: leave[0].timeId}, data).exec(function(err, leave) {
				return res.json(leave);
			});

			
		});
	},

	declineTimeKey: function(req, res) {

		TimeKey.update({id: req.params.id}, {status: 'decline'}).exec(function(err, leave){
			if(err) {
				return res.serverError(err);
			}

			return res.json(leave);
		});
	},

	viewOneRequestLeave: function(req, res) {

		Leave.findOne(req.params.id).populate('employee_id').exec(function(err, leave) {
			if(err) {
				return res.serverError(err);
			}

			return res.json(leave);
		});
		//console.log(req.param('data'));
	},

	acceptRequestLeave: function(req, res) {

		Leave.update({id: req.params.id}, {status: 'accepted'}).exec(function(err, leave){
			if(err) {
				return res.serverError(err);
			}

			if(leave[0].leave_type == "Force Leave") {
				Leave_Credit.findOne({employee_id: leave[0].employee_id}).exec(function(err, leave_credit){

					var leaveCr = leave_credit.force_leave - 1;
					Leave_Credit.update({employee_id: leave[0].employee_id},{force_leave: leaveCr}).exec(function(err, leave_credit) {

					});
				});
				console.log('leave_type');
			} else if(leave[0].leave_type == "Birthday Leave") {
				Leave_Credit.findOne({employee_id: leave[0].employee_id}).exec(function(err, leave_credit){

					var leaveCr = leave_credit.birthday_leave - 1;
					Leave_Credit.update({employee_id: leave[0].employee_id},{birthday_leave: leaveCr}).exec(function(err, leave_credit) {

					});
				});
				console.log('leave_type');
			} else if(leave[0].leave_type ==="Sick Leave") {
				Leave_Credit.findOne({employee_id: leave[0].employee_id}).exec(function(err, leave_credit){

					var leaveCr = leave_credit.sick_leave - 1;
					Leave_Credit.update({employee_id: leave[0].employee_id},{sick_leave: leaveCr}).exec(function(err, leave_credit) {

					});
				});
				console.log('leave_type');
			}
			console.log(leave);
			return res.json(leave);
		});
	},

	declineRequestLeave: function(req, res) {

		Leave.update({id: req.params.id}, {status: 'accepted'}).exec(function(err, leave){
			if(err) {
				return res.serverError(err);
			}

			return res.json(leave);
		});
	},

	showEmployeePayrollList: function(req, res) {

		User.find({account_type_id: [1, 2, 3]}).exec(function(err, users) {
			// body...
			var usersId = _.pluck(users, 'id');
			Employee.find({account_id: usersId, location_id: req.param('location_id')})
			.populate('account_id.account_type_id')
			.populate('physical_description')
			.populate('address')
			.populate('emergency')
			.populate('parent')
			.populate('sibling')
			.populate('education_background')
			.populate('employee_type_id')
			.populate('schedule')
			.populate('loan')
			.populate('payroll')
			.exec(function(err, employee) {

				if(err) {
					return res.serverError(err);
				}
				
				return res.json(employee);
			});
		})	
	},

	viewPayroll: function(req, res) {
		Payroll.findOne({employee_id: req.params.id}).populate('employee_id').exec(function(err, loan) {

			if(err) {
				return res.serverError(err);
			}	

			return res.json(loan);
		});
	},

	updatePayroll: function(req, res) {

		var data = {
			monthly_rate: req.param('monthly_rate'),
			amount_accured: req.param('amount_accured'),
			pera: req.param('pera'),
			withholding_tax: req.param('withholding_tax'),
			mpl: req.param('mpl'),
			personal_share: req.param('personal_share'),
			government_share: req.param('government_share'),
			ecc_new: req.param('ecc_new')
			
		};

		console.log(data);
		Payroll.update({employee_id: req.params.id}, data).exec(function(err, loan) {

			if(err) {
				return res.serverError(err);
			}	

			return res.json(loan);
		});
	},

	showEmployeeLoanList: function(req, res) {

		User.find({account_type_id: [1, 2, 3]}).exec(function(err, users) {
			// body...
			var usersId = _.pluck(users, 'id');
			Employee.find({account_id: usersId, location_id: req.param('location_id')})
			.populate('account_id.account_type_id')
			.populate('physical_description')
			.populate('address')
			.populate('emergency')
			.populate('parent')
			.populate('sibling')
			.populate('education_background')
			.populate('employee_type_id')
			.populate('schedule')
			.populate('loan')
			.exec(function(err, employee) {

				if(err) {
					return res.serverError(err);
				}
				
				return res.json(employee);
			});
		})	
	},

	viewLoan: function(req, res) {
		Loan.findOne({employee_id: req.params.id}).populate('employee_id').exec(function(err, loan) {

			if(err) {
				return res.serverError(err);
			}	

			return res.json(loan);
		});
	},

	updateLoan: function(req, res) {

		var data = {
			conso: req.param('conso'),
			policy: req.param('policy'),
			gsis_education: req.param('gsis_education'),
			gsis_emergency: req.param('gsis_emergency'),
			share_capital: req.param('share_capital'),
			stl: req.param('stl'),
			ltl: req.param('ltl'),
			education: req.param('education'),
			stl_other: req.param('stl_other'),
			pabaon: req.param('pabaon'),
			bts: req.param('bts'),
			silver: req.param('silver')
		};

		console.log(data);
		Loan.update({employee_id: req.params.id}, data).exec(function(err, loan) {

			if(err) {
				return res.serverError(err);
			}	

			return res.json(loan);
		});
	},

	viewEmployeeDTR: function(req, res) {

		var date = moment(new Date()).format('l');
		Log_TimeIn.find({employee_id: req.params.id}).populate('employee_id').exec(function(err, user) {

			if(err) {
				return res.serverError(err);
			}	

			return res.json(user);
		});
	},

	viewEmployeeSchedule: function(req, res) {
		Employee.find({location_id: req.param('location_id')}).populate('location_id.shifts').populate('schedule').exec(function(err, employee) {
			if(err) {
				return res.serverError(employee);
			}	

			return res.json(employee);
		});
	},

	viewOneEmployeeSchedule: function(req, res) {
		Employee.findOne(req.params.id).populate('location_id.shifts').populate('schedule').exec(function(err, employee) {
			if(err) {
				return res.serverError(employee);
			}	

			return res.json(employee);
		});
	},

	updateEmployeeSchedule: function(req, res) {
		var employee = {
			location_id: req.param('schedule').location_id,
			shift: req.param('schedule').shift
		};

		Employee.update({id: req.param('employee').id}, employee).exec(function (err, employee) {

			if(err) {
				return res.json(err);
			}

			var schedule = {
				monday: req.param('schedule').monday ? 'on':'off',
				tuesday: req.param('schedule').tuesday ? 'on':'off',
				wednesday: req.param('schedule').wednesday ? 'on':'off',
				thursday: req.param('schedule').thursday ? 'on':'off',
				friday: req.param('schedule').friday ? 'on':'off',
				saturday: req.param('schedule').saturday ? 'on':'off',
				sunday: req.param('schedule').sunday ? 'on':'off'
			};

			Schedule.update({employee_id: req.param('employee').id}, schedule).exec(function(err, schedule) {
				if(err) {
					return res.json(err);
				}

				return res.json(schedule);
			});
		});
	},

	showEmployeeDayLogs: function(req, res) {
		Log_TimeIn.find().populate('employee_id').sort('id DESC').exec(function(err, employee) {
			if(err) {
				return res.serverError(err);
			}

			var dayTime = [];

			_.each(employee, function(value, index) {
				if(value.employee_id.location_id == req.param('location_id')) {

					if(value.employee_id.shift == 'dayTime') {
						dayTime.push(value);
					}
				}

			});
			console.log(req.param('location_id'));

			return res.json(dayTime);		
		});
	},

	showEmployeeSwingLogs: function(req, res) {
		Log_TimeIn.find().populate('employee_id').sort('id DESC').exec(function(err, employee) {
			if(err) {
				return res.serverError(err);
			}

			var swingTime = [];

			_.each(employee, function(value, index) {

				if(value.employee_id.shift == 'swingTime') {
					swingTime.push(value);
				}
			});
			return res.json(swingTime);
		});
	},

	showEmployeeGraveLogs: function(req, res) {
		Log_TimeIn.find().populate('employee_id').sort('id DESC').exec(function(err, employee) {
			if(err) {
				return res.serverError(err);
			}

			var graveyardTime = [];

			_.each(employee, function(value, index) {

				if(value.employee_id.shift == 'graveyardTime') {
					graveyardTime.push(value);
				}
			});
			return res.json(graveyardTime);
		});
	},


	clockIn: function(req, res) {
		var empIdNumber = req.params.id;

		Employee.findOne({id_number: empIdNumber}).exec(function(err, employee) {
			if(err) {
				return res.serverError(err);
			}
			
			if(!employee) {
				return res.json(404, {message: 'Employee not found.'});
			}

			var time = new Date();
			time = time.getTime();


			var data = {
				logIn: moment(new Date()).format('LT'),
				employee_id: employee.id,
				date: moment(new Date()).format('l'),
				time: moment(new Date()).format('LT')
			};

			Log_TimeIn.find({employee_id: employee.id, logOut: ""}).exec(function(err, log) {
				if(log.length > 0) {
					sails.sockets.blast('timeIn', {status: 404, employee_id: employee.id});
					return res.json(404, {message: 'Employee is still logged in.',status: 404});
				}

				Log_TimeIn.create(data).exec(function(err, user) {

					if(err) {
						return res.serverError(err);
					}

					sails.sockets.blast('timeIn', {status: 200, employee_id: employee.id});
					
					return res.json(user);
				});
			});

			
		});

		
	},

	clockOut: function(req, res) {
		var empIdNumber = req.params.id;

		Employee.findOne({id_number: empIdNumber}).exec(function(err, employee) {
			if(err) {
				return res.serverError(err);
			}
			
			if(!employee) {
				return res.json(404, {message: 'Employee not found.', status: 404});
			}

			var time = new Date();
			time = time.getTime();

			var data = {
				logOut: moment(new Date()).format('LT')				
			};

			Log_TimeIn.findOne({employee_id: employee.id, logOut: ""}).exec(function(err, log) {

				if(err) {
					return res.serverError(err);
				}

				if(!log) {
					sails.sockets.blast('timeOut', {status: 404, employee_id: employee.id});
					return res.json(404, {message: 'Employee is not logged in.'});
				}
				
				Log_TimeIn.update({id: log.id},data).exec(function(err, log) {
					sails.sockets.blast('timeOut', {status: 200, employee_id: employee.id});
					return res.json(log);
				});
				
			});
		});
	},

	showLocation: function(req, res) {
		Location.find().populate('shifts').exec(function(err, location) {

			if(err) {
				return res.serverError(err);
			}	

			return res.json(location);
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

	showEmployeeLoan: function(req, res) {
		Employee.findOne(req.params.id).exec(function(err, employee) {

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
			Employee.find({account_id: usersId, location_id: req.param('location_id')})
			.populate('account_id.account_type_id')
			.populate('physical_description')
			.populate('address')
			.populate('emergency')
			.populate('parent')
			.populate('sibling')
			.populate('education_background')
			.populate('employee_type_id')
			.populate('schedule')
			.populate('loan')
			.populate('location_id')
			.exec(function(err, employee) {

				if(err) {
					return res.serverError(err);
				}
				
				return res.json(employee);
			});
		})	
	},

	showEmployeeScheduleList: function(req, res) {
		User.find({account_type_id: [1, 2, 3]}).exec(function(err, users) {
			// body...
			var usersId = _.pluck(users, 'id');
			Employee.find({account_id: usersId, location_id: req.param('location_id')})
			.populate('account_id.account_type_id')
			.populate('physical_description')
			.populate('address')
			.populate('emergency')
			.populate('parent')
			.populate('sibling')
			.populate('education_background')
			.populate('employee_type_id')
			.populate('schedule')
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
				if(err) {
					return res.serverError(err);
				}
				var employee = {
		          id_number: data.personal.id_number,
		          firstname: data.personal.firstname,
		          middlename: data.personal.middlename,
		          lastname: data.personal.lastname,
		          qualifier: data.personal.qualifier,
		          account_id: user.id,
		          employee_type_id: data.personal.employee_type_id,
		          location_id: 0,
		          shift: ""
		        };

				Employee.create(employee).exec(function(err, employee) {
					if(err) {
						return res.serverError(err);
					}
				}); 
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
		          employee_type_id: data.personal.employee_type_id,
		          location_id: data.personal.location_id,
		          shift: data.personal.shift
		        };

				Employee.create(employee).exec(function(err, employee) {
		          Address.create({employee_id: employee.id}).exec(function(err, address) {});
		          Emergency.create({employee_id: employee.id}).exec(function(err, address) {});
		          Physical_Description.create({employee_id: employee.id}).exec(function(err, physical_Description) {});
		          Loan.create({employee_id: employee.id}).exec(function(err, physical_Description) {});
		          Leave_Credit.create({employee_id: employee.id}).exec(function(err, physical_Description) {});
		          Payroll.create({employee_id: employee.id}).exec(function(err, physical_Description) {});

		          var schedule = [
		            {
		              monday: data.schedule.monday ? 'on' : 'off',
		              tuesday: data.schedule.tuesday ? 'on' : 'off',
		              wednesday: data.schedule.wednesday ? 'on' : 'off',
		              thursday: data.schedule.thursday ? 'on' : 'off',
		              friday: data.schedule.friday ? 'on' : 'off',
		              saturday: data.schedule.saturday ? 'on' : 'off',
		              sunday: data.schedule.sunday ? 'on' : 'off',
		              employee_id: employee.id
		            }
		          ];

		          Schedule.create(schedule).exec(function(err, address) {});

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

			/*if(err) {
				return res.json(500, err);
			};*/

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

