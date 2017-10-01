/**
 * Address.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  tableName: 'tbl_address',
  attributes: {

  	barangay: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	municipality: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	province: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	country: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	zip_code: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	employee_id: {
  		model: 'employee'
  	}
  }
};

