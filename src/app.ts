import cors from 'cors';
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { loadControllerOffers } from "./controllers/offers";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connect
const user = "user"
const pass = "pass"
const dbname = 'dbname'
const uri = `urlmongodb, user pass and dbname`


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(()=> {console.log("connected data base")})
  .catch((e)=> {console.log(e)})

// Cors configuration
const allowedOrigins = ['http://localhost:8080'];

const CorsOptions: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(CorsOptions));


app.use(
  express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })
);

loadControllerOffers(app);

export default app;
