/**
 * LoanController
 *
 * @description :: Server-side logic for managing Loans
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	dashboard: function(req, res) {
		return res.view('loan/ladmindashboard');
	}
};

