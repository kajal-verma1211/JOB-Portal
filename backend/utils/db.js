import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongo connected");
        
    }
    catch(eror){
        console.log("error");
        
    }
}

export default connectDB;