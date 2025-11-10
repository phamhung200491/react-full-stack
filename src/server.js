import express from "express"
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import initWerbRoutes from './route/web'
require('dotenv').config() // dùng để chạy process.env.PORT - line 20

// query, param
let app = express();

//config app

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWerbRoutes(app)

let port = process.env.PORT || 6969
//PORT === underfined => port = 6969
app.listen(port, () => {
    //call back
    console.log("Backend Nodejs is running on the port : " + port)
})
