/**
 * Loan.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  tableName: 'tbl_loan',
  attributes: {
  	
  	conso: {
      type: 'string',
      defaultsTo: 0
    },

    policy: {
      type: 'string',
      defaultsTo: 0
    },

    gsis_education: {
      type: 'string',
      defaultsTo: 0
    },

    gsis_emergency: {
      type: 'string',
      defaultsTo: 0
    },

    share_capital: {
      type: 'string',
      defaultsTo: 0
    },

    stl: {
      type: 'string',
      defaultsTo: 0
    },

    ltl: {
      type: 'string',
      defaultsTo: 0
    },

    education: {
      type: 'string',
      defaultsTo: 0
    },

    stl_other: {
      type: 'string',
      defaultsTo: 0
    },

    pabaon: {
      type: 'string',
      defaultsTo: 0
    },

    bts: {
      type: 'string',
      defaultsTo: 0
    },

    silver: {
      type: 'string',
      defaultsTo: 0
    },

  	employee_id: {
  		model: 'employee'
  	}
  }
};

