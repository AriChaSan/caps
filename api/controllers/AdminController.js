/**
 * AdminController
 *
 * @description :: Server-side logic for managing Admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	absencereports: function(req, res) {
		return res.view('admin/absencereports');
	},

	addemployee: function(req, res) {
		return res.view('admin/addemployeeaccount');
	},

	allrecords: function(req, res) {
		return res.view('admin/allrecords');
	},

	attendancesummary: function(req, res) {
		return res.view('admin/attendancesummary');
	},

	dashboard: function(req, res) {
		return res.view('admin/dashboard');
	},

	employeelist: function(req, res) {
		return res.view('admin/employeelist');
	},

	manageemployeeschedule: function(req, res) {
		return res.view('admin/manageemployeeschedule');
	},

	onebyonerecord: function(req, res) {
		return res.view('admin/onebyonerecord');
	},

	schedulesummary: function(req, res) {
		return res.view('admin/schedulesummary');
	},

	updatepersonalprofile: function(req, res) {
		return res.view('admin/updatepersonalprofile');
	},

	viewpersonalprofile: function(req, res) {
		return res.view('admin/viewpersonalprofile');
	}
};

