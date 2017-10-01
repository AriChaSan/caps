/**
 * Parent.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  tableName: 'tbl_parent',
  attributes: {


  	parent_type: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	name: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	dob: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	contact: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	occupation: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	company_name: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	company_address: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	employee_id: {
  		model: 'employee'
  	},

    toJSON: function() {
      var obj = this.toObject();
      delete obj.employee_id;
      delete obj.createdAt;
      delete obj.updatedAt;
      return obj;
    }
  }
};

