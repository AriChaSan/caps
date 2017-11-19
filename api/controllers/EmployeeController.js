/**
 * EmployeeController
 *
 * @description :: Server-side logic for managing Employees
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	dashboard: function(req, res) {
		return res.view('employee/Dashboard');
	},

	requestkeychange: function(req, res) {
		return res.view('employee/requestkeychange');
	},

	requestleave: function(req, res) {
		return res.view('employee/RequestLeave');
	},

	requestscheduleswap: function(req, res) {
		return res.view('employee/RequestScheduleSwap');
	},

	updatepersonalprofile: function(req, res) {
		return res.view('employee/UpdatePersonalProfile');
	},

	viewattendance: function(req, res) {
		return res.view('employee/ViewAttendance');
	},

	viewpersonalprofile: function(req, res) {
		return res.view('employee/ViewPersonalProfile');
	},

	viewschedule: function(req, res) {
		return res.view('employee/ViewSchedule');
	}

};

