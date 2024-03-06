import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB.js";
import routes from "./routes/web.js";
import { join } from "path";
dotenv.config();
const app = express();
const port = process.env.PORT || 8001;
const DATABASE_URL = process.env.DATABASE_URL;

//Database connection
connectDB(DATABASE_URL);

//Handle Cors error in frontend
app.use(cors());

//Handle html page in ejs form
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(join(process.cwd(),"public"))) // Method 2

// Handle json
app.use(express.json());

// handle cookies
app.use(cookieParser());

// Handle post request
app.use(express.urlencoded({ extended: true }));

//Handle url
app.use("/", routes);

app.all("*", (req, res) => {
  res.status(404).send("<h1>404! Page not found</h1>");
});

app.listen(port, () => {
  console.log(`Server start on ${port}`);
});
