/**
 * Shift.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  
  schema: true,
  tableName: 'tbl_shift',
  attributes: {

  	shift_type: {
  		type: 'string'
  	},

  	start: {
  		type: 'string'
  	},

  	end: {
  		type: 'string'
  	},

  	location_id: {
  		model: 'location'
  	}

  }
};

