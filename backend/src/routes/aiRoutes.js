const express = require('express');
const router = express.Router();
const { protect, teacherOnly } = require('../middlewares/authMiddleware');

router.post('/generate', protect, teacherOnly, (req, res) => {
  res.json({ message: 'Generated questions via AI (Mock or Real)' });
});

module.exports = router;
