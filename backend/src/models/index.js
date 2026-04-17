const sequelize = require('../config/database');
const User = require('./User');
const Quiz = require('./Quiz');
const Question = require('./Question');
const Option = require('./Option');
const Attempt = require('./Attempt');
const Result = require('./Result');

// Associations
User.hasMany(Quiz, { foreignKey: 'teacher_id', onDelete: 'CASCADE' });
Quiz.belongsTo(User, { foreignKey: 'teacher_id' });

Quiz.hasMany(Question, { foreignKey: 'quiz_id', onDelete: 'CASCADE' });
Question.belongsTo(Quiz, { foreignKey: 'quiz_id' });

Question.hasMany(Option, { foreignKey: 'question_id', onDelete: 'CASCADE' });
Option.belongsTo(Question, { foreignKey: 'question_id' });

Quiz.hasMany(Attempt, { foreignKey: 'quiz_id', onDelete: 'CASCADE' });
Attempt.belongsTo(Quiz, { foreignKey: 'quiz_id' });

User.hasMany(Attempt, { foreignKey: 'student_id', onDelete: 'SET NULL' });
Attempt.belongsTo(User, { foreignKey: 'student_id' });

Attempt.hasMany(Result, { foreignKey: 'attempt_id', onDelete: 'CASCADE' });
Result.belongsTo(Attempt, { foreignKey: 'attempt_id' });

Question.hasMany(Result, { foreignKey: 'question_id', onDelete: 'CASCADE' });
Result.belongsTo(Question, { foreignKey: 'question_id' });

Option.hasMany(Result, { foreignKey: 'selected_option_id', onDelete: 'SET NULL' });
Result.belongsTo(Option, { foreignKey: 'selected_option_id' });

module.exports = {
  sequelize,
  User,
  Quiz,
  Question,
  Option,
  Attempt,
  Result,
};
