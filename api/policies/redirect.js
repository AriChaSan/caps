/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if(req.session.authenticated) {
    if (req.session.User.account_type == 'csu_superadmin') {
      return res.redirect('/sadmin/dashboard');
    }

    if (req.session.User.account_type == 'csu_admin') {
      return res.redirect('/admin/dashboard');
    }

    if (req.session.User.account_type == 'csu_employee') {
      return res.redirect('/employees/dashboard');
    }

    if (req.session.User.account_type == 'loan') {
      return res.redirect('/loan/dashboard');
    }

    if (req.session.User.account_type == 'accounting') {
      return res.redirect('/payroll/dashboard');
    }
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return next();
};
