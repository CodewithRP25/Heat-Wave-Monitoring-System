const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Mongo connected");
    } catch(error){
        console.error("Mongo connection failed SHIT:",error.message);
        process.exit(1);
    }
};

module.exports=connectDB;