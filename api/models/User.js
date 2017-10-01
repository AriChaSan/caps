/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  tableName: 'tbl_account',
  attributes: {

  	username: {
  		type: 'string',
  		size: 128,
      unique: true
  	},

  	password: {
  		type: 'string',
  		size: 128
  	},

  	status: {
  		type: 'string',
  		size: 128,
  		defaultsTo: 'active'
  	},

  	account_type_id: {
  		model: 'account_type'
  	},

    employee: {
      collection: 'employee',
      via: 'account_id'
    },

    toJSON: function() {
      var obj = this.toObject();
      obj.account_type = obj.account_type_id.account_type;
      delete obj.account_type_id;
      delete obj.createdAt;
      delete obj.updatedAt;
      return obj;
    }
  },

  beforeCreate: function(values, cb) {
    
  var bcrypt = require('bcryptjs');
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(values.password, salt);
  
  values.password = hash;

  cb();               
  }
};

