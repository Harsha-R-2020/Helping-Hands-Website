const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const otpSchema = new Schema({
  mail: {
    type: String,
    required: true,
  },
  token:{
    type: String,
    required: true,
  },
  time:{
    type:Date,
    required: true,
  }
});
const Otp = mongoose.model('Otp', otpSchema);
module.exports = Otp;