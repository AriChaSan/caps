/**
 * PayrollController
 *
 * @description :: Server-side logic for managing Payrolls
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	dashboard: function(req, res) {
		return res.view('payroll/PadminDashboard');
	}
};

