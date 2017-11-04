/**
 * Payroll.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  tableName: 'tbl_payroll',
  attributes: {
  	monthly_rate: {
  		type: 'string',
  		defaultsTo: ''
  	},

  	amount_accured: {
  		type: 'string',
  		defaultsTo: ''
  	},

  	pera: {
  		type: 'string',
  		defaultsTo: ''
  	},

  	withholding_tax: {
  		type: 'string',
  		defaultsTo: ''
  	},

  	mpl: {
  		type: 'string',
  		defaultsTo: ''
  	},

  	personal_share: {
  		type: 'string',
  		defaultsTo: ''
  	},

  	government_share: {
  		type: 'string',
  		defaultsTo: ''
  	},

  	ecc_new: {
  		type: 'string',
  		defaultsTo: ''
  	},



  	employee_id: {
  		model: 'employee'
  	}
  }
};

