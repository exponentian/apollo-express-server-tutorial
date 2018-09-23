import mongoose from 'mongoose';
import bcrypt from'bcrypt';
import jwt from'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'username required'],
      unique: [true, 'username already exists']
      
    },
    password: {
      type: String,
      required: [true, 'password required']
    }
  }
);


UserSchema.methods.hashPassword = function hashPassword(reqPassword) {
  return bcrypt.hashSync(reqPassword, 10);
};

UserSchema.methods.getJWT = function getJWT() {
  return jwt.sign({ username: this.username }, JWT_SECRET_KEY, {expiresIn: '1d'});
};

UserSchema.methods.verifyPassword = function verifyPassword(reqPassword) {
  return bcrypt.compareSync(reqPassword, this.password);
};


export default mongoose.model('User', UserSchema);