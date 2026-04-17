const express = require('express');
const router = express.Router();
const { protect, teacherOnly } = require('../middlewares/authMiddleware');

// Mock routes for now
router.get('/', protect, (req, res) => {
  res.json({ message: 'List of quizzes' });
});

router.post('/', protect, teacherOnly, (req, res) => {
  res.status(201).json({ message: 'Quiz created' });
});

module.exports = router;
