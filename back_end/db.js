const mongoose = require('mongoose');
require('dotenv').config()

const { MONGO_URI } = process.env;
console.log('hello',typeof MONGO_URI);
const connectToMongo = async () => {
    try {
        console.log(MONGO_URI);
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

module.exports = connectToMongo;