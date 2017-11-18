/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    policy: 'redirect',
    view: 'index'
  },

  'POST /login': 'UserController.login',
  'POST /logout': 'UserController.logout',

  'GET /user': 'UserController.index',
  'GET /user/:id': 'UserController.showUser',
  'POST /user/changepassword/:id': 'UserController.changePassword',

  'GET /allaccount': 'UserController.allAccount',

  'POST /employeeenable/:id': 'UserController.enableEmployee',
  'POST /employeedisable/:id': 'UserController.disableEmployee',

  'GET /employee': 'UserController.showEmployeeList',
  'GET /employee/:id': 'UserController.showEmployee',
  'PUT /employee/:id': 'UserController.update',
  'POST /employee': 'UserController.create',
  'GET /employeeschedulelist': 'UserController.showEmployeeScheduleList',
  'GET /employeedaylogs' : 'UserController.showEmployeeDayLogs',
  'GET /employeeswinglogs' : 'UserController.showEmployeeSwingLogs',
  'GET /employeegravelogs' : 'UserController.showEmployeeGraveLogs',

  'POST /employeeupdateschedule' : 'UserController.updateEmployeeSchedule',

  'GET /employeeviewschedule' : 'UserController.viewEmployeeSchedule',
  'GET /employeeviewoneschedule/:id' : 'UserController.viewOneEmployeeSchedule',
  //'GET /employeedtr/:id' : 'UserController.viewEmployeeDTR',

  'GET /employeeloanlist': 'UserController.showEmployeeLoanList',
  'GET /employeeloan/:id': 'UserController.showEmployeeLoan',
  'GET /employeeviewloan/:id': 'UserController.viewLoan',
  'POST /employeeupdateloan/:id': 'UserController.updateLoan',
  'POST /employeerequestleave/:id': 'UserController.requestLeave',
  'GET /employeeviewrequestleave': 'UserController.viewRequestLeave',
  'GET /employeeviewonerequestleave/:id': 'UserController.viewOneRequestLeave',
  'POST /employeeacceptrequestleave/:id': 'UserController.acceptRequestLeave',
  'POST /employeedeclinerequestleave/:id': 'UserController.declineRequestLeave',

  'GET /employeeviewleavecredit/:id': 'UserController.viewLeaveCredit',

  'GET /employeepayroll': 'UserController.showEmployeePayrollList',
  'GET /employeepayroll/:id': 'UserController.viewPayroll',
  'POST /employeeupdatepayroll/:id': 'UserController.updatePayroll',

  'GET /employeeattendance/:id': 'UserController.showEmployeeAttendance',
  'GET /employeeattendancesummary': 'UserController.employeeAttendanceSummary',
  'GET /employeeabsencereport': 'UserController.employeeAbsenceReport',
  'GET /employeeabsencereportdetail/:id': 'UserController.employeeAbsenceReportDetail',
  'GET /employeedtr/:id': 'UserController.employeeDTR',

  'GET /employeeallrecord': 'UserController.allRecord',
  'GET /employeekeychange/:id': 'UserController.keyChange',
  'POST /employeekeychange/:id': 'UserController.postKeyChange',
  'GET /employeerequestkeychange/:id': 'UserController.viewOneTimeKey',
  'POST /employeeaccepttimekey/:id': 'UserController.acceptTimeKey',
  'POST /employeedeclinetimekey/:id': 'UserController.declineTimeKey',



  'POST /employee/clockin/:id': 'UserController.clockIn',
  'POST /employee/clockout/:id': 'UserController.clockOut',

  'GET /viewlocation': 'UserController.showLocation',

  'GET /sadmin/absencereports': 'SadminController.absencereports',
  'GET /sadmin/addemployee': 'SadminController.addemployee',
  'GET /sadmin/allrecords': 'SadminController.allrecords',
  'GET /sadmin/attendancesummary': 'SadminController.attendancesummary',
  'GET /sadmin/dashboard': 'SadminController.dashboard',
  'GET /sadmin/employeelist': 'SadminController.employeelist',
  'GET /sadmin/manageemployeeschedule': 'SadminController.manageemployeeschedule',
  'GET /sadmin/onebyonerecord': 'SadminController.onebyonerecord',
  'GET /sadmin/schedulesummary': 'SadminController.schedulesummary',
  'GET /sadmin/settings': 'SadminController.settings',
  'GET /sadmin/updatepersonalprofile': 'SadminController.updatepersonalprofile',
  'GET /sadmin/viewpersonalprofile': 'SadminController.viewpersonalprofile',


  'GET /admin/absencereports': 'AdminController.absencereports',
  'GET /admin/addemployee': 'AdminController.addemployee',
  'GET /admin/allrecords': 'AdminController.allrecords',
  'GET /admin/attendancesummary': 'AdminController.attendancesummary',
  'GET /admin/dashboard': 'AdminController.dashboard',
  'GET /admin/employeelist': 'AdminController.employeelist',
  'GET /admin/manageemployeeschedule': 'AdminController.manageemployeeschedule',
  'GET /admin/onebyonerecord': 'AdminController.onebyonerecord',
  'GET /admin/schedulesummary': 'AdminController.schedulesummary',
  'GET /admin/updatepersonalprofile': 'AdminController.updatepersonalprofile',
  'GET /admin/viewpersonalprofile': 'AdminController.viewpersonalprofile',

  'GET /loan/dashboard': 'LoanController.dashboard',

  'GET /payroll/dashboard': 'PayrollController.dashboard',

  'GET /employees/dashboard': 'EmployeeController.dashboard',
  'GET /employees/requestleave': 'EmployeeController.requestleave',
  'GET /employees/requestscheduleswap': 'EmployeeController.requestscheduleswap',
  'GET /employees/updatepersonalprofile': 'EmployeeController.updatepersonalprofile',
  'GET /employees/viewattendance': 'EmployeeController.viewattendance',
  'GET /employees/viewpersonalprofile': 'EmployeeController.viewpersonalprofile',
  'GET /employees/viewschedule': 'EmployeeController.viewschedule',
  'GET /employees/requestkeychange': 'EmployeeController.requestkeychange',

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
