const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attempt = sequelize.define('Attempt', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quiz_id: { type: DataTypes.INTEGER, allowNull: false },
  student_id: { type: DataTypes.INTEGER, allowNull: true },
  start_time: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  end_time: { type: DataTypes.DATE, allowNull: true },
  score: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 },
  tab_switch_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  status: { type: DataTypes.ENUM('in_progress', 'completed', 'auto_submitted'), defaultValue: 'in_progress' },
}, {
  tableName: 'attempts',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Attempt;
