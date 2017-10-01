/**
 * Emergency.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  tableName: 'tbl_emergency',
  attributes: {

  	contact_person: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	relation: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	contact_number: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

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

