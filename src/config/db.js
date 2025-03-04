const mongoose = require("mongoose");

const connectDB = async()=>{

    try{
        await mongoose.connect("mongodb://localhost:27017/");
        console.log("connected to db ")
    }catch(e){
        console.log("connection failed",e.message)
    }
}

module.exports = connectDB;