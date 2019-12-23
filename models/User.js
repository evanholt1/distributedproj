const mongoose = require('mongoose');
require('mongoose-type-email');

const UserSchema = new mongoose.Schema({
  email: {
      type: mongoose.SchemaTypes.Email,
      required : true,
      maxlength:100
    },
  password: {
    type: String,
    required : true,
    minlength : 3,
    maxlength : 128
  },
  firstName:{
    type : String,
    minlength : 3,
    maxlength : 50
  },
  lastName:{
    type : String,
    minlength : 3,
    maxlength : 50
  }
});

module.exports =  mongoose.model('User',UserSchema);