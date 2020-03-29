const express = require("express");
const router = express.Router();
const passport = require("passport");
const Chart = require("../Models/Chart");
const User = require("../Models/User");





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
        if( req.body.subject) chartFields.subject = req.body.subject;
  




        const user = await User.findById(req.user.id).select("-password");
  
        const newChart = new Chart({
          chartType: req.body.chartType,
          title: req.body.title,
          subject: req.body.subject,
          data: req.body.data,      
          user: req.user.id,
          
        });
  
        const chart = await newChart.save();
  
        res.json(chart);
      } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
      }
    }
  );

  // passport.authenticate("jwt", {session:false}),

// @ POST api/charts/update
// @desc update a chart
// @access Private
  router.post('/update',
  passport.authenticate("jwt", { session: false }),
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
        const charts = await Chart.find({ user: req.user.id }).select("-data").populate("user",["subjects"])
  
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

  // ,
  // passport.authenticate("jwt", { session: false })



// @ POST api/chart/all
// @desc get all charts of current logged user
// @access Private
router.get(
  "/all",
  async (req, res) => {
    try {
      const charts = await Chart.find().select("id").select("chartType").select("subject").populate("user",["subjects"])

      if (charts.length < 1)
        return res
          .status(404)
          .json({ msg: "No charts were found" });

      return res.status(200).json(charts);
    } catch (err) {
      console.log(err);
      return res.status(500).send("server error");
    }
  }
);



// @ POST api/charts/:PostID
// @desc get chart by ID
// @access Private
router.get(
  "/:ChartID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const chart = await Chart.findById(req.params.ChartID);

      if (!chart) return res.status(404).json({ msg: "No chart was found" });

      return res.status(200).json(chart.data);
    } catch (err) {
      if (err.kind === "ObjectId")
        return res.status(404).json({ msg: "No chart was found" });
      console.log(err);
      return res.status(500).send("server error");
    }
  }
);

// @ POST api/charts/subjects
// @desc update subjects of User
// @access Private
router.post('/subjects',passport.authenticate("jwt", { session: false }),
async (req,res) => {




  
try {
 const userExists = await User.findById(req.user.id)

  const fields = {};
 
  if(userExists){


    if (typeof req.body.subjects !== "undefined") {
      fields.subjects = req.body.subjects.split(",");
    }

     const chart = await User.findByIdAndUpdate(
         { _id: req.user.id},
         { subjects:  fields.subjects},
         { new: true },)

         res.status(200).send("updated");


  }
  else res.status(404).send("Not Found");


} catch(err){
    console.log(err);
    res.status(500).send("server Error");
} } )





  module.exports = router;