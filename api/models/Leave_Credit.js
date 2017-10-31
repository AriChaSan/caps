/**
 * Leave_Credit.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  tableName: 'tbl_leave_credit',
  attributes: {

  	force_leave: {
  		type: 'string',
  		defaultsTo: '5'
  	},

  	birthday_leave: {
  		type: 'string',
  		defaultsTo: '1'
  	},

  	sick_leave: {
  		type: 'string',
  		defaultsTo: '4'
  	},


  	employee_id: {
  		model: 'employee'
  	}

  }
};

