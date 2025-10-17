const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const StudentMaster = sequelize.define("StudentMaster", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  academic_year: { type: DataTypes.INTEGER, allowNull: false },
  branch: { type: DataTypes.STRING, allowNull: false },
  normalized_name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = StudentMaster;
