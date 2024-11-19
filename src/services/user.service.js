import dotenv from 'dotenv';
dotenv.config();
import sequelize, { DataTypes } from '../config/database';
const User = require('../models/user')(sequelize, DataTypes);
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (body) => {
  body.password = await bcrypt.hash(body.password, 10);
  const data = await User.create(body);
  return data;
};

export const getUserByEmail = async (req) => {
  const data = await User.findOne({ where: { email: req.email } });
  if (data != null) {
    if (await bcrypt.compare(req.password, data.password)) {
      return jwt.sign(
        { id: data.id, email: data.email },
        process.env.ACCESS_TOKEN_SECRET
      );
    } else {
      throw new Error('Invalid Password');
    }
  } else {
    throw new Error('Invalid Email');
  }
};
