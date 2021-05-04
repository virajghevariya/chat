const mongoose = require('mongoose');
const colors = require('colors');


const connectDB = async() => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log(`Database connected : ${conn.connection.host}`.green.bold);
}

module.exports = connectDB;