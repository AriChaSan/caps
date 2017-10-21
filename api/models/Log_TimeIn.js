/**
 * Log_TimeIn.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  tableName: 'tbl_log_timein',
  attributes: {

  	logIn: {
  		type: 'string'
  	},

    logOut: {
      type: 'string',
      defaultsTo: ""
    },

  	employee_id: {
  		model: 'employee'
  	}
  }
};

