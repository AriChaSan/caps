/**
 * SadminController
 *
 * @description :: Server-side logic for managing Sadmins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	absencereports: function(req, res) {
		return res.view('sadmin/AbsenceReports');
	},

	addemployee: function(req, res) {
		return res.view('sadmin/AddEmployeeAccount');
	},

	allrecords: function(req, res) {
		return res.view('sadmin/AllRecords');
	},

	attendancesummary: function(req, res) {
		return res.view('sadmin/AttendanceSummary');
	},

	dashboard: function(req, res) {
		return res.view('sadmin/Dashboard');
	},

	employeelist: function(req, res) {
		return res.view('sadmin/EmployeeList');
	},

	manageemployeeschedule: function(req, res) {
		return res.view('sadmin/ManageEmployeeSchedule');
	},

	onebyonerecord: function(req, res) {
		return res.view('sadmin/OneByOneRecord');
	},

	schedulesummary: function(req, res) {
		return res.view('sadmin/ScheduleSummary');
	},

	settings: function(req, res) {
		return res.view('sadmin/Settings');
	},

	updatepersonalprofile: function(req, res) {
		return res.view('sadmin/UpdatePersonalProfile');
	},

	viewpersonalprofile: function(req, res) {
		return res.view('sadmin/ViewPersonalProfile');
	}
};

