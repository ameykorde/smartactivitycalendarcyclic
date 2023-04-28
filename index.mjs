// Import necessary modules
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './connectDB/connectDB.js';
import authRoute from './routes/authRoute.js';
import notice from './routes/notice.js';
import ongoing from './routes/ongoing.js';
import teachers from './routes/teachers.js';
import timeTable from './routes/timeTable.js';
import calendar from './routes/acRoute.js';
import absentTeacher from './routes/absentTeacher.js';
import todo from './routes/todo.js';
import verify from './middleware/verifyToken.js';
import path from 'path';

// Create an express app
const app = express(); 

// Set up CORS
app.use(cors());

// Load environment variables
dotenv.config({ path: './.env' });

// Set up port number
const PORT = process.env.PORT || 5000;

// Use express json middleware
app.use(express.json());

// Serve static files from public folder
app.use(express.static('public'));

// Use routes
app.use(authRoute);

// Use verify middleware for protected routes
app.use('/notice', verify, notice);
app.use('/timetable', verify, timeTable);
app.use('/teacher', verify, teachers);
app.use('/ongoing', verify, ongoing);
app.use('/calendar', verify, calendar);
app.use('/todo', verify, todo);

app.use('/absent', absentTeacher);

// Serve static files
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, './frontend')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/dist/index.html'));
});

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
