import  express, { Router }  from "express";
import {config } from "dotenv";
import errorMiddleware from "./Middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import router from "./Routes/user.routes.js";
config()

const app = express();

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('welcome to the library management system')
})
app.use('/', router)
// page not found
app.all('*', (req, res) => {
    res.status(404).send('OOPS! 404 NOT FOUND');
})

//error handling
app.use(errorMiddleware)

export default app