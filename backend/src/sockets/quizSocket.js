module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_quiz', (quizCode) => {
      socket.join(`quiz_${quizCode}`);
      console.log(`Socket ${socket.id} joined room quiz_${quizCode}`);
    });

    socket.on('submit_answer', (data) => {
      // Broadcast to teacher/others if necessary
      io.to(`quiz_${data.quizCode}`).emit('answer_submitted', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
