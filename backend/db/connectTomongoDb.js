import mongoose from "mongoose";

const connectTomongoDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to db")
        
    } catch (error) {
        console.log("error connecting to db",error)
        
    }
}
export default connectTomongoDb;