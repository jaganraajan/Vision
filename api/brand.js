const express = require("express");
const router = express.Router();

const Brand = require("../Models/Brand");


// @ POST api/brand
// @desc push sentiments for brand
// @access Public
router.post(
  "/sentiments",


  async (req, res) => {
    

 

    try {
      
      console.log(req.body.sentiments);

      const brandFields = {};

      if (req.body.name) brandFields.name = req.body.name;
      if( req.body.sentiments) brandFields.sentiments = req.body.sentiments;

       const brandExists = await Brand.findOne({name: req.body.name})

       if (brandExists){
        const brand = await Brand.findOneAndUpdate(
          { name: req.body.name },
          { $set: brandFields },
          { new: true })

          res.json(brand)

       } 
       else {

          const newBrand= new Brand({
          name: req.body.name,
          sentiments: req.body.sentiments
         
        });
  
        const brand = await newBrand.save();
  
        res.json(brand);

       }



    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);


// @ POST api/brand
// @desc pull sentiments for brand
// @access Public
router.get(
  "/sentiments",
  async (req, res) => {
    try {
      const brand = await Brand.findOne({ name: req.body.name });

      if (!brand)
        return res
          .status(404)
          .json({ msg: "No info was found for specified brand" });

      return res.status(200).json(brand.sentiments);
    } catch (err) {
      console.log(err);
      return res.status(500).send("server error");
    }
  }
);


module.exports = router;