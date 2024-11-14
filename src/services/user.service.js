import sequelize, { DataTypes } from '../config/database';
const User = require('../models/user')(sequelize, DataTypes);

export const registerUser = async (body) => {
  const data = await User.create(body);
  return data;
};
