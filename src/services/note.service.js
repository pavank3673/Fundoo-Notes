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

export const getNote = async (id) => {
  const data = await Note.findByPk(id);
  return data;
};

export const updateNote = async (id, body) => {
  await Note.update(body, {
    where: { noteId: id }
  });
  return body;
};

export const deleteNote = async (id) => {
  await Note.destroy({ where: { noteId: id } });
  return '';
};

export const toggleArchivedNote = async (note) => {
  note.isArchive = note.isArchive ? false : true;
  const result = await Note.update(
    { isArchive: note.isArchive },
    {
      where: { noteId: note.noteId }
    }
  );
  return result;
};

export const toggleTrashedNote = async (note) => {
  note.isTrash = note.isTrash ? false : true;
  const result = await Note.update(
    { isTrash: note.isTrash },
    {
      where: { noteId: note.noteId }
    }
  );
  return result;
};
