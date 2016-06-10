import mongoose from 'mongoose';
import crypto from 'crypto';
import config from '../config';

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: String
});

userSchema.methods.encodePassword = function(password) {
  return crypto.createHash('sha1', config.secretToken).update(password + this.salt).digest('hex');
};

userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.salt = Math.random() + '';
    this.password = this.encodePassword(this.password);
  }
  next();
});

export default mongoose.model('User', userSchema);