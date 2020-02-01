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

// app.post(
//     "/",
  
  
//     async (req, res) => {
      
  
   
  
//       try {
        
  
//         const newBrand= new Brand({
//           sentiments: req.body.sentiments
         
//         });
  
//         const brand = await newBrand.save();
  
//         res.json(brand);
//       } catch (err) {
//         console.log(err);
//         res.status(500).send("Server Error");
//       }
//     }
//   );



const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Server started on ${PORT}`));