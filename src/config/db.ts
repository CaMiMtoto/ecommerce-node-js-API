import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        let mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce";
        await mongoose.connect(mongoUri as string, {});
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
