/**
 * Physical_Description.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  
  schema: true,
  tableName: 'tbl_physical_description',
  attributes: {

  	height: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	weight: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	built: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	eye_color: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	hair_color: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	complexion: {
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

