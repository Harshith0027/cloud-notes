// const mongoose = require('mongoose');
// require('dotenv').config()

// const { MONGO_URI } = process.env;
// const connectToMongo = async () => {
//     try {
//         console.log(MONGO_URI);
//         await mongoose.connect(MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log("DB connected successfully!");
//     } catch (error) {
//         console.error("MongoDB connection error:", error);
//     }
// };

// module.exports = connectToMongo;

const mongoose = require('mongoose');
require('dotenv').config();

const { MONGO_URI } = process.env;

const connectToMongo = async () => {
    try {
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is not defined in the environment variables.");
        }
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

module.exports = connectToMongo;
