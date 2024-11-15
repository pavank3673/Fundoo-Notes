import sequelize, { DataTypes } from '../config/database';
const User = require('../models/user')(sequelize, DataTypes);

export const registerUser = async (body) => {
  const data = await User.create(body);
  return data;
};

export const getUserByEmail = async (email) => {
  const data = await User.findOne({ where: { email: email } });
  return data;
};
