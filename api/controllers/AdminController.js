/**
 * AdminController
 *
 * @description :: Server-side logic for managing Admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	absencereports: function(req, res) {
		return res.view('admin/AbsenceReports');
	},

	addemployee: function(req, res) {
		return res.view('admin/AddEmployeeAccount');
	},

	allrecords: function(req, res) {
		return res.view('admin/AllRecords');
	},

	attendancesummary: function(req, res) {
		return res.view('admin/AttendanceSummary');
	},

	dashboard: function(req, res) {
		return res.view('admin/Dashboard');
	},

	employeelist: function(req, res) {
		return res.view('admin/EmployeeList');
	},

	manageemployeeschedule: function(req, res) {
		return res.view('admin/ManageEmployeeSchedule');
	},

	onebyonerecord: function(req, res) {
		return res.view('admin/OneByOneRecord');
	},

	schedulesummary: function(req, res) {
		return res.view('admin/ScheduleSummary');
	},

	updatepersonalprofile: function(req, res) {
		return res.view('admin/UpdatePersonalProfile');
	},

	viewpersonalprofile: function(req, res) {
		return res.view('admin/ViewPersonalProfile');
	}
};

