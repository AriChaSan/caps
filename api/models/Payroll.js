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
  		defaultsTo: 0
  	},

  	amount_accured: {
  		type: 'string',
  		defaultsTo: 0
  	},

  	pera: {
  		type: 'string',
  		defaultsTo: 0
  	},

  	withholding_tax: {
  		type: 'string',
  		defaultsTo: 0
  	},

  	mpl: {
  		type: 'string',
  		defaultsTo: 0
  	},

  	personal_share: {
  		type: 'string',
  		defaultsTo: 0
  	},

  	government_share: {
  		type: 'string',
  		defaultsTo: 0
  	},

  	ecc_new: {
  		type: 'string',
  		defaultsTo: 0
  	},



  	employee_id: {
  		model: 'employee'
  	}
  }
};

