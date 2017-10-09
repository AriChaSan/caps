/**
 * Schedule.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  
  schema: true,
  tableName: 'tbl_schedule',
  attributes: {

  	monday: {
  		type: 'string',
  		defaultsTo: 'off'
  	},


  	tuesday: {
  		type: 'string',
  		defaultsTo: 'off'
  	},

  	wednesday: {
  		type: 'string',
  		defaultsTo: 'off'
  	},

  	thursday: {
  		type: 'string',
  		defaultsTo: 'off'
  	},

  	friday: {
  		type: 'string',
  		defaultsTo: 'off'
  	},

  	saturday: {
  		type: 'string',
  		defaultsTo: 'off'
  	},

  	sunday: {
  		type: 'string',
  		defaultsTo: 'off'
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

