import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app = express();

const requiredStartupEnv = {
    MONGO_URI: 'MongoDB connection URI used by Mongoose to reach the CareerHub database.',
    SECRET_KEY: 'JWT signing secret used by the authentication middleware and login endpoints.'
};

const missingStartupEnv = Object.entries(requiredStartupEnv)
    .filter(([key]) => !process.env[key])
    .map(([key, description]) => `${key} (${description})`);

if (missingStartupEnv.length > 0) {
    console.error('CareerHub startup is blocked because required environment variables are missing:');
    console.error(missingStartupEnv.join('\n'));
    console.error('Provide them in a .env file or the runtime environment before launching the API.');
    process.exit(1);
}

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
const corsOptions = {
    origin: frontendOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

const PORT = Number(process.env.PORT || 3000);
if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
    console.error(`CareerHub startup is blocked because PORT is invalid: ${process.env.PORT || '3000'}`);
    process.exit(1);
}

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running at port ${PORT}`);
        });
    } catch (error) {
        console.error('CareerHub backend could not start:', error?.message || error);
        process.exit(1);
    }
};

startServer();