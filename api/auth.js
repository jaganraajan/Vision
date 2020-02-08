const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../Models/User");
const config = require("config");


//@route GET api/auth
//@desc authenticate registered user
//@access private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = User.findById(req.user.id).select("-password");

      res.json(user);
    } catch (err) {
      console.log("Server Error");
      res.status(500).send(err.message);
    }
  }
);

// @ POST api/login
// @desc authenticate user and get token
// @access public
router.post(
  "/login",
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
        user: {
          id: user.id
        }
      };

      // Sign Token
      jwt.sign(
        payload,
        config.get("secretOrKey"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token: token
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
router.post("/register",

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
                      token: token
                    });
                  }
                );
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

module.exports = router;
