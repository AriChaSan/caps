/**
 * Educational_Background.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,
  tableName: 'tbl_educational_background',
  attributes: {

  	education_type: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	school: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	course: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	year: {
  		type: 'string',
  		size: 128,
  		defaultsTo: ''
  	},

  	award: {
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

