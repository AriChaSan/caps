/**
 * Log_TimeIn.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var moment =  require('moment');
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

    date: {
      type: 'string',
      defaultsTo: moment(new Date()).format('l')
    },

    time: {
      type: 'string',
      defaultsTo: moment(new Date()).format('LTS')
    },

  	employee_id: {
  		model: 'employee'
  	}
  }
};

