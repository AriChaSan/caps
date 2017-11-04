/**
 * EmployeeController
 *
 * @description :: Server-side logic for managing Employees
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	dashboard: function(req, res) {
		return res.view('employee/dashboard');
	},

	requestkeychange: function(req, res) {
		return res.view('employee/requestkeychanges');
	},

	requestleave: function(req, res) {
		return res.view('employee/requestleave');
	},

	requestscheduleswap: function(req, res) {
		return res.view('employee/requestscheduleswap');
	},

	updatepersonalprofile: function(req, res) {
		return res.view('employee/updatepersonalprofile');
	},

	viewattendance: function(req, res) {
		return res.view('employee/viewattendance');
	},

	viewpersonalprofile: function(req, res) {
		return res.view('employee/viewpersonalprofile');
	},

	viewschedule: function(req, res) {
		return res.view('employee/viewschedule');
	}

};

