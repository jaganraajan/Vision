const express = require('express');
const connectDB = require('./config/db')
const bodyParser = require('body-parser');
const brand = require("./api/brand");
const Brand = require("./Models/Brand");
const app = express();


connectDB();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use("/api/brand", brand);




const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Server started on ${PORT}`));