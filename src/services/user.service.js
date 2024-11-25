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
      console.log('data.userId--------' + data.userId);
      return jwt.sign(
        { id: data.userId, email: data.email },
        process.env.ACCESS_TOKEN_SECRET
      );
    } else {
      throw new Error('Invalid Password');
    }
  } else {
    throw new Error('Invalid Email');
  }
};

export const forgotPasswordUser = async (body) => {
  const data = await User.findOne({ where: { email: body.email } });
  if (data != null) {
    return jwt.sign(
      {
        id: data.userId,
        email: data.email
      },
      process.env.ACCESS_TOKEN_FORGOT_PASSWORD
    );
  } else {
    throw new Error('Invalid Email');
  }
};

export const resetPasswordUser = async (body) => {
  body.password = await bcrypt.hash(body.password, 10);
  const data = await User.update(
    { password: body.password },
    {
      where: { userId: body.userId }
    }
  );
  return data;
};
