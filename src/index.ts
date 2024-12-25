import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import cookieParser from 'cookie-parser';
import categoryRoutes from "./routes/categoryRoutes";
import tagRoutes from "./routes/tagRoutes";

dotenv.config();

// Connect to the database
connectDB().then(r => console.log('Database connected successfully'));

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5000'],
    credentials: true
}))
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Error handling (optional, for better debugging)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
