const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  company: { type: String },
  isAgency: { type: String, enum: ['yes', 'no'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
