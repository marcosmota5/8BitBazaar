const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  sex: { type: String, enum: ['M', 'F', 'N'], required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  register_date: { type: Date, default: Date.now },
  phone_number: String,
  picture_path: String,
  birth_date: { type: Date, required: true },
  address_line_1: { type: String, required: true },
  address_line_2: String,
  postal_code: { type: String, required: true },
  city: { type: String, required: true },
  state_province: { type: String, required: true },
  country: { type: String, required: true },
  status: { type: String, enum: ['A', 'I'], default: 'A' }
});

// Hash password before save
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
