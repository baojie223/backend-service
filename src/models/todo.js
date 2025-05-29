const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Todo = sequelize.define("Todo", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: "Title of the todo item",
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: "Content of the todo item",
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: "Completion status of the todo item",
  }
}, {
    tableName: "todos",
});

module.exports = Todo;