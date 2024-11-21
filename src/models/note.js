'use-strict';
const { Model, DataTypes } = require('sequelize');
import sequelize from '../config/database';
const User = require('./user')(sequelize, DataTypes);
module.exports = (sequelize, Datatypes) => {
  class Note extends Model {
    static associate(models) {}
  }

  Note.init(
    {
      noteId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Datatypes.STRING,
        allowNull: false
      },
      description: {
        type: Datatypes.STRING,
        allowNull: false
      },
      color: Datatypes.STRING,
      isArchive: {
        type: Datatypes.BOOLEAN,
        defaultValue: false
      },
      isTrash: {
        type: Datatypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'note'
    }
  );
  Note.belongsTo(User, { as: ' ' });
  return Note;
};
