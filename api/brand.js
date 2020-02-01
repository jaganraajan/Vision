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

      const newBrand= new Brand({
        sentiments: req.body.sentiments
       
      });

      const brand = await newBrand.save();

      res.json(brand);
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
      const sentiments = await Brand.find();

      if (sentiments.length < 1)
        return res.status(404).json({ msg: "No posts were found" });

      return res.status(200).json(sentiments);
    } catch (err) {
      console.log(err);
      return res.status(500).send("server error");
    }
  }
);


module.exports = router;