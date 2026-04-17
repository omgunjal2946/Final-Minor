const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Quiz = sequelize.define('Quiz', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  teacher_id: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  type: { type: DataTypes.ENUM('normal', 'live'), defaultValue: 'normal' },
  quiz_code: { type: DataTypes.STRING(50), unique: true, allowNull: true },
  duration_minutes: { type: DataTypes.INTEGER, allowNull: true },
  status: { type: DataTypes.ENUM('draft', 'active', 'completed'), defaultValue: 'draft' },
}, {
  tableName: 'quizzes',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Quiz;
