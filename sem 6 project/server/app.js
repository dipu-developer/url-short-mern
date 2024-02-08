import express from "express";
import dotenv from "dotenv";
import os from 'os'
console.log(os.cpus().length)
import connectDB from "./db/connectDB.js";
import routes from "./routes/web.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 8001;
const DATABASE_URL = process.env.DATABASE_URL;

//Database connection
connectDB(DATABASE_URL)

// Handle json 
app.use(express.json())

// Handle post request
app.use(express.urlencoded({extended:true}))

//Handle url
app.use('/',routes)

app.listen(port, () => {
  console.log(`Server start on ${port}`);
});
