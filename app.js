require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const sendMessage = require('./services/rabbitmq');

connectDB();
const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
  sendMessage('taskQueue', 'Servidor iniciado');
});
