/**
 * TimeKey.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  tableName: 'tbl_timekey',
  attributes: {
  	date: {
  		type: 'string',
  		defaultsTo: ""
  	},
  	prevTimeIn: {
  		type: 'string',
  		defaultsTo: ""
  	},
  	prevTimeOut: {
  		type: 'string',
  		defaultsTo: ""
  	},
  	newTimeIn: {
  		type: 'string',
  		defaultsTo: ""
  	},
  	newTimeOut: {
  		type: 'string',
  		defaultsTo: ""
  	},
  	timeId: {
  		type: 'string',
  		defaultsTo: ""
  	},
  	status: {
  		type: 'string',
  		defaultsTo: "pending"
  	},
  	employee_id: {
  		model: 'employee'
  	}
  }
};

