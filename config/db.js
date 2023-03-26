const mongoose = require('mongoose');
const connectDB = async ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((res)=>{
        console.log(`MongoDB connected: ${res.connection.host}`)
    })
}
module.exports = connectDB;