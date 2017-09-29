/**
 * SadminController
 *
 * @description :: Server-side logic for managing Sadmins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	absencereports: function(req, res) {
		return res.view('sadmin/absencereports');
	},

	addemployee: function(req, res) {
		return res.view('sadmin/addemployeeaccount');
	},

	allrecords: function(req, res) {
		return res.view('sadmin/allrecords');
	},

	attendancesummary: function(req, res) {
		return res.view('sadmin/attendancesummary');
	},

	dashboard: function(req, res) {
		return res.view('sadmin/dashboard');
	},

	employeelist: function(req, res) {
		return res.view('sadmin/employeelist');
	},

	manageemployeeschedule: function(req, res) {
		return res.view('sadmin/manageemployeeschedule');
	},

	onebyonerecord: function(req, res) {
		return res.view('sadmin/onebyonerecord');
	},

	schedulesummary: function(req, res) {
		return res.view('sadmin/schedulesummary');
	},

	settings: function(req, res) {
		return res.view('sadmin/settings');
	},

	updatepersonalprofile: function(req, res) {
		return res.view('sadmin/updatepersonalprofile');
	},

	viewpersonalprofile: function(req, res) {
		return res.view('sadmin/viewpersonalprofile');
	}
};

