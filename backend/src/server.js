require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { sequelize } = require('./models');

const app = express();

// ✅ CORS setup
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

app.use(express.json());

// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

// ✅ Setup sockets
require('./sockets/quizSocket')(io);



// =======================
// 🔥 TEST ROUTES (IMPORTANT)
// =======================

// Root route
app.get('/', (req, res) => {
  res.send('Quiz Platform Backend Running 🚀');
});

// API base test
app.get('/api', (req, res) => {
  res.send('API is working ✅');
});

// Quick test route
app.get('/test', (req, res) => {
  res.send('Backend test successful 🎯');
});



// =======================
// 📌 MAIN ROUTES
// =======================

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/quizzes', require('./routes/quizRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));



// =======================
// 🏥 HEALTH CHECK
// =======================
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});



// =======================
// ❌ ERROR HANDLER
// =======================
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message
  });
});



// =======================
// 🚀 START SERVER
// =======================

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Database connected & synced');

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err);
  });
