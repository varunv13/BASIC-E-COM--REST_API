import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Connection successful!!");
    } catch (error) {
        console.log("Connection failure!!");
        process.exit(1);
    }
};

export default dbConnect;