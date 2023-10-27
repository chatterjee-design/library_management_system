import  express  from "express";
import {config } from "dotenv";
config()

const app = express();
app.get('/', (req, res) => {
    res.send('welcome to the library management system')
})


export default app