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
      defaultsTo: ""
    },

    policy: {
      type: 'string',
      defaultsTo: ""
    },

    gsis_education: {
      type: 'string',
      defaultsTo: ""
    },

    gsis_emergency: {
      type: 'string',
      defaultsTo: ""
    },

    share_capital: {
      type: 'string',
      defaultsTo: ""
    },

    stl: {
      type: 'string',
      defaultsTo: ""
    },

    ltl: {
      type: 'string',
      defaultsTo: ""
    },

    education: {
      type: 'string',
      defaultsTo: ""
    },

    stl_other: {
      type: 'string',
      defaultsTo: ""
    },

    pabaon: {
      type: 'string',
      defaultsTo: ""
    },

    bts: {
      type: 'string',
      defaultsTo: ""
    },

    silver: {
      type: 'string',
      defaultsTo: ""
    },

  	employee_id: {
  		model: 'employee'
  	}
  }
};

