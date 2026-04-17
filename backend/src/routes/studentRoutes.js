const express = require('express');
const router = express.Router();
const { protect, teacherOnly } = require('../middlewares/authMiddleware');

router.get('/', protect, teacherOnly, (req, res) => {
  res.json({ message: 'List of students' });
});

module.exports = router;
