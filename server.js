const express = require('express');
const connectDB = require('./config/db')
const bodyParser = require('body-parser');
const brand = require("./api/brand");
const auth = require("./api/auth");
const app = express();


connectDB();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use("/api/brand", brand);
app.use("/api/auth", auth);


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Server started on ${PORT}`));