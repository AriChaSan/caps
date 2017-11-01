/**
 * Leave.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  tableName: 'tbl_leave',
  attributes: {

  	leave_type: {
  		type: 'string'
  	},

  	leave_days: {
  		type: 'string'
  	},

  	leave_vacation: {
  		type: 'string'
  	},

  	sick_vacation: {
  		type: 'string'
  	},

    reason: {
      type: 'string'
    },

  	date_from: {
  		type: 'string'
  	},

  	date_to: {
  		type: 'string'
  	},

    status: {
      type: 'string',
      defaultsTo: 'pending'
    },
  	employee_id: {
  		model: 'employee'
  	}
  }
};

