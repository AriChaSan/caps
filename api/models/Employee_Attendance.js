/**
 * Employee_Attendance.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  tableName: 'tbl_employee_attendance',
  attributes: {

  	attendance_status: {
  		type: 'string'
  	},

  	timeIn: {
  		type: 'string'
  	},

  	timeOut: {
  		type: 'string'
  	},

  	late: {
  		type: 'string'
  	},

  	overtime: {
  		type: 'string'
  	},

    undertime: {
      type: 'string'
    },

    workhours: {
      type: 'string'
    },

    date: {
      type: 'string'
    },

  	status: {
  		type: 'string'
  	},

  	employee_id: {
  		model: 'employee'
  	}
  }
};
