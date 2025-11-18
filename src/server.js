import express from "express"
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import initWerbRoutes from './route/web'
import connectDB from './config/connectDB'
import cors from 'cors'
require('dotenv').config() // dùng để chạy process.env.PORT - line 20

// query, param
let app = express();
//app.use(cors({ origin: true }))

app.use(cors({
    origin: 'http://localhost:3000',  // FE domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight
app.options('*', cors());

//config app

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWerbRoutes(app)

connectDB()

let port = process.env.PORT || 6969
//PORT === underfined => port = 6969
app.listen(port, () => {
    //call back
    console.log("Backend Nodejs is running on the port : " + port)
})
