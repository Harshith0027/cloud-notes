const connectToMongo = require("./db");
require('dotenv').config()

const DBConnect = async () => {
    await connectToMongo();
};
DBConnect();
const app = require('express')()
const cors = require('cors');
const port = 5000;

//we are suing a middleware to obtain json objects for body of specific api request and responce
app.use(require('express').json());
//cors = cross-origin resource access...we need to use it different domain and server connection for api calls
app.use(cors());

//available routes
const authRouter = require("./routes/auth.js");
const notesRouter = require("./routes/notes.js");
app.use("/api/auth",authRouter);
app.use("/api/notes",notesRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log(`Server is online!`);
});