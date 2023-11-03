import app from "./app.js";
import connectToDb from "./config/connection.db.js";

const port = process.env.PORT || 3000

//listen on particular port
app.listen(port,async ()=>{
    console.log(`app is running at http://localhost:${port}`)
    await connectToDb()
});