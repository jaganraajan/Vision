const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../Models/User");
const config = require("config");
const cors = require('cors');




var whitelist = ['http://localhost:3000'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

//@route GET api/auth
//@desc authenticate registered user
//@access private
// router.get(
//   "/current", 
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     try {
//       const user = await User.findById(req.user.id).select("-password");

//       res.json(user);
//     } catch (err) {
//       console.log("Server Error");
//       res.status(500).send(err.message);
//     }
//   }
// );

router.get(
  "/current", cors(corsOptions),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      name: req.user.name,
      email: req.user.email,
      id: req.user.id
    });
  }
);


// @ POST api/login
// @desc authenticate user and get token
// @access public
router.post(
  "/signin", cors(corsOptions),
  async (req, res) => {
    
    // if (!errors.isEmpty())
    //   return res.status(400).json({ errors: errors.array() });

    try {
      const { email, password } = req.body;

      let user = await User.findOne({ email });

      if (!user) {
        const errors = ["Invalid credentials"];
        return res.status(400).json(errors);
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });

      const payload = {
          id: user.id,
          name: user.name
      };

      // Sign Token
      jwt.sign(
        payload,
        config.get("secretOrKey"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({
            success: true,
            token: "Bearer " + token
          });
        }
      );
    } catch (err) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
  }
);


// @ POST api/users/register
// @desc Register user
// @access public
router.post("/signup", 

async (req, res) => {
    
  
    // Check Validation

  
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {

        return res.status(400);
      } else {
          
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                const payload = {
                  id: user.id,
                  name: user.name
                }; // create jwt paylod
  
                // Sign Token
                jwt.sign(
                  payload,
                  config.get("secretOrKey"),
                  { expiresIn: 360000 },
                  (err, token) => {
                    res.json({
                      success: true,
                      token: "Bearer " + token
                    });
                  }
                );
              })
              .catch(err => window.alert('bla',err));
          });
        });
      }
    });
  });

module.exports = router;
