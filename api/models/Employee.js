/**
 * Employee.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  
  schema: true,
  tableName: 'tbl_employee',
  attributes: {

  	id_number: {
  		type: 'string',
  		size: 128,
  		required: true
  	},

  	firstname: {
  		type: 'string',
  		size: 128,
  		required: true
  	},

  	middlename: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	lastname: {
  		type: 'string',
  		size: 128,
  		required: true
  	},

  	qualifier: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	gender: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	religion: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	nationality: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	dob: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	pob: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	civil_status: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	email: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	mobile_number: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	account_id: {
  		model: 'user'
  	},

    image: {
      type: 'string',
      size: 128,
      defaultsTo: 'user-icon.jpg'
    },

    physical_description: {
      collection: 'physical_description',
      via: 'employee_id'
    },

    address: {
      collection: 'address',
      via: 'employee_id'
    },

    emergency: {
      collection: 'emergency',
      via: 'employee_id'
    },

    parent: {
      collection: 'parent',
      via: 'employee_id'
    },

    sibling: {
      collection: 'sibling',
      via: 'employee_id'
    },

    education_background: {
      collection: 'education_background',
      via: 'employee_id'
    },

  	toJSON: function() {
      var obj = this.toObject();
      delete obj.createdAt;
      delete obj.updatedAt;
      return obj;
    }
  }
};

