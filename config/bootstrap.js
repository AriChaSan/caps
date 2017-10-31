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
  sails.config.hookTimeout = 60000;

  User.findOne({username: 'sadmin'}).exec(function(err, user) {

    if(!user) {

      var user = {
        username: 'sadmin',
        password: 'sadmin',
        account_type_id: 1
      };

      User.create(user).exec(function(err, user) {
        var employee = {
          id_number: '123456',
          firstname: 'Crisostomo',
          lastname: 'Pabalan',
          account_id: user.id,
          employee_type_id: 4,
          location_id: 7,
          shift: 'dayTime'
        };


        Employee.create(employee).exec(function(err, employee) {
          Schedule.create({employee_id: employee.id}).exec(function(err, address) {});
          Address.create({employee_id: employee.id}).exec(function(err, address) {});
          Emergency.create({employee_id: employee.id}).exec(function(err, address) {});
          Physical_Description.create({employee_id: employee.id}).exec(function(err, physical_Description) {});
          Loan.create({employee_id: employee.id}).exec(function(err, physical_Description) {});
          Leave_Credit.create({employee_id: employee.id}).exec(function(err, physical_Description) {});

          var parent = [
            {
              parent_type: 'father',
              employee_id: employee.id
            },
            {
              parent_type: 'mother',
              employee_id: employee.id
            }
          ];

          Parent.create(parent).exec(function(err, parent) {});

          var sibling = [
            {
              employee_id: employee.id
            },
            {
              employee_id: employee.id
            },
            {
              employee_id: employee.id
            },
            {
              employee_id: employee.id
            }
          ];

          Sibling.create(sibling).exec(function(err, sibling) {});

          var education = [
            {
              education_type: 'elementary',
              employee_id: employee.id
            },
            {
              education_type: 'highschool',
              employee_id: employee.id
            },
            {
              education_type: 'college',
              employee_id: employee.id
            },
            {
              education_type: 'post_graduate',
              employee_id: employee.id
            }
          ];

          Education_Background.create(education).exec(function(err, education_background) {});
        });   
        
      });
      
    }

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
      employee_type: 'security officer IV'
    }
  ];

  Employee_Type.findOrCreate(employee_type, employee_type).exec(function(err, employee_type) {
    console.log(employee_type);
  });

     var location = [
      {
        location: 'city college of angeles'
      },
      {
        location: 'blood bank'
      },
      {
        location: 'cswdo'
      },
      {
        location: 'renal care unit'
      },
      {
        location: 'museo ning angeles'
      },
      {
        location: 'angeles city library'
      },
      {
        location: 'city hall'
      }
    ];

    Location.findOrCreate(location).exec(function(err, employeeType) {

    });

    var shiftType = [
      {
        shift_type: 'dayTime',
        start: '7 am',
        end: '3 pm',
        location_id: 1
      },
      {
        shift_type: 'swingTime',
        start: '3 pm',
        end: '11 pm',
        location_id: 1
      },
      {
        shift_type: 'graveyardTime',
        start: '11 pm',
        end: '7 am',
        location_id: 1
      },
      {
        shift_type: 'dayTime',
        start: '7 am',
        end: '3 pm',
        location_id: 2
      },
      {
        shift_type: 'swingTime',
        start: '3 pm',
        end: '11 pm',
        location_id: 2
      },
      {
        shift_type: 'graveyardTime',
        start: '11 pm',
        end: '7 am',
        location_id: 2
      },
      {
        shift_type: 'dayTime',
        start: '7 am',
        end: '3 pm',
        location_id: 3
      },
      {
        shift_type: 'swingTime',
        start: '3 pm',
        end: '11 pm',
        location_id: 3
      },
      {
        shift_type: 'graveyardTime',
        start: '11 pm',
        end: '7 am',
        location_id: 3
      },
      {
        shift_type: 'dayTime',
        start: '7 am',
        end: '3 pm',
        location_id: 4
      },
      {
        shift_type: 'swingTime',
        start: '3 pm',
        end: '11 pm',
        location_id: 4
      },
      {
        shift_type: 'graveyardTime',
        start: '11 pm',
        end: '7 am',
        location_id: 4
      },
      {
        shift_type: 'dayTime',
        start: '6 am',
        end: '2 pm',
        location_id: 5
      },
      {
        shift_type: 'swingTime',
        start: '2 pm',
        end: '10 pm',
        location_id: 5
      },
      {
        shift_type: 'graveyardTime',
        start: '10 pm',
        end: '6 am',
        location_id: 5
      },
      {
        shift_type: 'dayTime',
        start: '6 am',
        end: '2 pm',
        location_id: 6
      },
      {
        shift_type: 'swingTime',
        start: '2 pm',
        end: '10 pm',
        location_id: 6
      },
      {
        shift_type: 'graveyardTime',
        start: '10 pm',
        end: '6 am',
        location_id: 6
      },
      {
        shift_type: 'dayTime',
        start: '7 am',
        end: '3 pm',
        location_id: 7
      },
      {
        shift_type: 'swingTime',
        start: '3 pm',
        end: '11 pm',
        location_id: 7
      },
      {
        shift_type: 'graveyardTime',
        start: '11 pm',
        end: '7 am',
        location_id: 7
      }
    ];

    Shift.findOrCreate(shiftType).exec(function(err, employeeType) {

    });

  cb();
};
