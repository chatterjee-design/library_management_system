import  express  from "express";
import {config } from "dotenv";
import errorMiddleware from "./Middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from 'cloudinary';
import userRouter from "./Routes/user.routes.js";
import libraryRoute from "./Routes/library.routes.js";

//config doten file
config()

const app = express();

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//cloudinary setup for uploading files to cloudinary         
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

app.get('/', (req, res) => {
res.send('hii')
})

//router setup
app.use('/api/user', userRouter);
app.use('/api/library', libraryRoute)

//if page not found
app.all('*', (req, res) => {
    res.status(404).send('OOPS! 404 NOT FOUND');
})

//error handling/ if any error happens
app.use(errorMiddleware)

export default app;