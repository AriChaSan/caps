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

    employee_type_id: {
      model: 'employee_type'
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

    timein: {
      collection: 'log_timein',
      via: 'employee_id'
    },

    timeout: {
      collection: 'log_timeout',
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

    schedule: {
      collection: 'schedule',
      via: 'employee_id'
    },

    location_id: {
      model: 'location'
    },

    shift: {
      type: 'string'
    },

  	toJSON: function() {
      var obj = this.toObject();
      var elementary = _.findWhere(obj.education_background, {education_type: 'elementary'});
      var highschool = _.findWhere(obj.education_background, {education_type: 'highschool'});
      var college = _.findWhere(obj.education_background, {education_type: 'college'});
      var post_graduate = _.findWhere(obj.education_background, {education_type: 'post_graduate'});

      
      delete obj.education_background;
      delete obj.createdAt;
      delete obj.updatedAt;

      obj.education_background = [];

      obj.education_background.push(elementary);
      obj.education_background.push(highschool);
      obj.education_background.push(college);
      obj.education_background.push(post_graduate);
      return obj;
    }
  }
};

