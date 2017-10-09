/**
 * Location.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  
  schema: true,
  tableName: 'tbl_location',
  attributes: {

  	location: {
  		type: 'string'
  	},

  	shifts: {
  		collection: 'shift',
  		via: 'location_id'
  	}
  }
};

