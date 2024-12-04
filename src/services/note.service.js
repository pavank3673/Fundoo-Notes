import sequelize, { DataTypes } from '../config/database';
const Note = require('../models/note')(sequelize, DataTypes);
import { client } from '../middlewares/redis.middleware';

export const newNote = async (body) => {
  const data = await Note.create(body);
  if (data) {
    await client.del('noteList');
  }
  return data;
};

export const getAllNotes = async (body) => {
  const data = await Note.findAll({
    where: {
      UserId: body.UserId
    }
  });
  if (data) {
    await client.set('noteList', JSON.stringify(data));
  }
  return data;
};

export const getNote = async (id) => {
  const data = await Note.findByPk(id);
  return data;
};

export const updateNote = async (id, body) => {
  const data = await Note.update(body, {
    where: { noteId: id }
  });
  if (data) {
    await client.del('noteList');
  }
  return body;
};

export const deleteNote = async (id) => {
  await Note.destroy({ where: { noteId: id } });
  await client.del('noteList');
  return '';
};

export const toggleArchivedNote = async (note) => {
  note.isArchive = note.isArchive ? false : true;
  const data = await Note.update(
    { isArchive: note.isArchive },
    {
      where: { noteId: note.noteId }
    }
  );
  if (data) {
    await client.del('noteList');
  }
  return data;
};

export const toggleTrashedNote = async (note) => {
  note.isTrash = note.isTrash ? false : true;
  const data = await Note.update(
    { isTrash: note.isTrash },
    {
      where: { noteId: note.noteId }
    }
  );
  if (data) {
    await client.del('noteList');
  }
  return data;
};
