import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();
<<<<<<< HEAD
=======
const apiKey = process.env.API_KEY;
>>>>>>> d123a41f96a4d9066b7bb8e76626789a566fc324
mongoose.connect(process.env.MONGO).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log(err);
});

// console.log(mongoose.version); 

const app = express();
app.use(express.json()); // Middleware for parsing JSON bodies

app.listen(3000, () => {
    console.log('Server is running on port 3000!!');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message
    });
});