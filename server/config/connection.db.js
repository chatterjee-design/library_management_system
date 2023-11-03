import mongoose from "mongoose";

mongoose.set('strictQuery', false)

const connectToDb = async () => {
    try {
        //connect to database
        const connection = await mongoose.connect(process.env.MONGO_URI)
        if (connection){
            console.log(`connected to mongoose: ${connection}`)
        }

    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

export default connectToDb