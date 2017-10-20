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

  	log: {
  		type: 'string'
  	},

  	employee_id: {
  		model: 'employee'
  	}
  }
};

