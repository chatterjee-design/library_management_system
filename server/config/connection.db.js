import mongoose from "mongoose";


const connectToDb = async () => {
    try {
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