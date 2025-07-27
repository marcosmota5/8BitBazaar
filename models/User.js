// Create the mongoose object
const mongoose = require('mongoose');

// Create the bcrypt object to handle password hashing
const bcrypt = require('bcrypt');

// Create the user schema matching the database structure
const UserSchema = new mongoose.Schema({
  githubId: { type: String, unique: true, sparse: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  sex: { type: String, enum: ['M', 'F', 'N'], required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  registerDate: { type: Date, default: Date.now },
  profile: { type: String, enum: ['User', 'Admin'], required: true },
  phoneNumber: String,
  picturePath: String,
  birthDate: { type: Date, required: true },
  addressLine_1: { type: String, required: true },
  addressLine_2: String,
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  stateProvince: { type: String, required: true },
  country: { type: String, required: true },
  status: { type: String, enum: ['A', 'I'], default: 'A' }
}, { collection: 'Users' });

// Hash password before save
UserSchema.pre('save', async function (next) {
  try {
    // Only hash password if modified
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }

    next();
  } catch (err) {
    next(err);
  }
});

// Compare password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

// Export the model
module.exports = mongoose.model('User', UserSchema);
