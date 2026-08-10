import mongoose from "mongoose";

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        const message = 'Startup failed: MONGO_URI is not defined. Add MONGO_URI to the backend environment before starting the API.';
        console.error(message);
        throw new Error(message);
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected successfully');
    } catch (error) {
        const reason = error?.message || 'Unknown MongoDB connection error';
        const detail = `MongoDB connection failed: ${reason}. Check MONGO_URI, network access, credentials, and Atlas connectivity.`;
        console.error(detail);
        throw new Error(detail);
    }
}
export default connectDB;