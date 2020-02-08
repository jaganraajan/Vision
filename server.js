const express = require('express');
const connectDB = require('./config/db')
const bodyParser = require('body-parser');
const brand = require("./api/brand");
const auth = require("./api/auth");
var cors = require('cors')
const app = express();
const passport = require('passport');

connectDB();


app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

// Passport Config;
require("./config/passport")(passport);

app.use("/api/brand", brand);
app.use("/api/auth", auth);


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Server started on ${PORT}`));