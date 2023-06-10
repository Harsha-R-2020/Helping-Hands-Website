const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const donateSchema = new Schema({
  name: { type: String, required: true },
  pname: { type: String, required: true },
  quant: { type: String, required: true },
  description: { type: String, required: true },
});
const Donate = mongoose.model('Donate', donateSchema);
module.exports = Donate;