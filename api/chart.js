const express = require("express");
const router = express.Router();
const passport = require("passport");
const Chart = require("../Models/Chart");






// @ POST api/charts
// @desc create a chart
// @access Private
router.post(
    "/create",
  
    passport.authenticate("jwt", { session: false }),
  
    async (req, res) => {
      
  
      
  
      try {


        const chartFields = {};

        if (req.body.chartType) chartFields.chartType = req.body.chartType;
        if( req.body.title) chartFields.title = req.body.title;
        if( req.body.data) chartFields.data = req.body.data;
  




        const user = await User.findById(req.user.id).select("-password");
  
        const newChart = new Chart({
          chartType: req.body.chartType,
          title: req.body.title,
          data: req.body.data,          
          user: req.user.id
        });
  
        const chart = await newChart.save();
  
        res.json(chart);
      } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
      }
    }
  );


  router.post('/update', passport.authenticate("jwt", {session:false}),
   async (req,res) => {




     
try {
    const chartExists = await Chart.findById(req.body.id)

     if(chartExists){
        const chart = await Chart.findByIdAndUpdate(
            { _id: req.body.id},
            { data:  req.body.data},
            { new: true },)
  
            res.json(chart)


     }
     else res.status(404).send("Not Found");


   } catch(err){
       console.log(err);
       res.status(500).send("server Error");
   } } )



   // @ POST api/charts/currentuser
// @desc get all charts of current logged user
// @access Private
router.get(
    "/currentuser",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        const charts = await Chart.find({ user: req.user.id }).select("-data")
  
        if (charts.length < 1)
          return res
            .status(404)
            .json({ msg: "No charts were found for specified user" });
  
        return res.status(200).json(charts);
      } catch (err) {
        console.log(err);
        return res.status(500).send("server error");
      }
    }
  );

  module.exports = router;