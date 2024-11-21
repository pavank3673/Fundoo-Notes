import e from 'express';
import sequelize, { DataTypes } from '../config/database';
const Note = require('../models/note')(sequelize, DataTypes);

export const newNote = async (body) => {
  const data = await Note.create(body);
  return data;
};

export const getAllNotes = async (body) => {
  const data = await Note.findAll({
    where: {
      UserId: body.UserId
    }
  });
  return data;
};
