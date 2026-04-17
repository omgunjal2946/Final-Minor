const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Result = sequelize.define('Result', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  attempt_id: { type: DataTypes.INTEGER, allowNull: false },
  question_id: { type: DataTypes.INTEGER, allowNull: false },
  selected_option_id: { type: DataTypes.INTEGER, allowNull: true },
  is_correct: { type: DataTypes.BOOLEAN, defaultValue: false },
  time_taken_seconds: { type: DataTypes.INTEGER, allowNull: true },
  points_awarded: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 },
}, {
  tableName: 'results',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Result;
