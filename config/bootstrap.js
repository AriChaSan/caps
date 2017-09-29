/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

  var user = {
  	username: 'sadmin',
  	password: 'sadmin',
  	account_type_id: 1
  };

  User.findOrCreate(user, user).exec(function(err, user) {
  	console.log(user);

    var employee = {
      id_number: '123456',
      firstname: 'Crisostomo',
      lastname: 'Pabalan',
      account_id: user.id
    };

    Employee.findOrCreate(employee, employee).exec(function(err, employee) {
      console.log(employee);
    });
  });

  var account_type = [
  	{
  		account_type: 'csu_superadmin'
  	},
  	{
  		account_type: 'csu_admin'
  	},
  	{
  		account_type: 'csu_employee'
  	},
  	{
  		account_type: 'loan'
  	},
  	{
  		account_type: 'accounting'
  	}
  ];

  Account_Type.findOrCreate(account_type, account_type).exec(function(err, account_type) {
  	console.log(account_type);
  });

  var employee_type = [
    {
      employee_type: 'security officer I'
    },
    {
      employee_type: 'security officer II'
    },
    {
      employee_type: 'security officer III'
    },
    {
      employee_type: 'lsecurity officer IV'
    }
  ];

  Employee_Type.findOrCreate(employee_type, employee_type).exec(function(err, employee_type) {
    console.log(employee_type);
  });

  cb();
};
