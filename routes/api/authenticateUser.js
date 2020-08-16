const express = require('express');
//get router tool from express
const router = express.Router();
const auth = require('../../middleware/authenticateToken');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// @route     GET api/auth
// @descrip   Test Route
// @access    Public
router.get('/', auth, async (req, res) => {
  try {
    //req.user is from auth.js setting it to an ID
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/auth
// @descrip   Authenticate user & get token(Logging in User)
// @access    Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please is required').exists(),
  ],
  async (req, res) => {
    console.log(req.body);
    // Output any required fields from user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    //data inputted in by user
    const { email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (!user) {
        res.status(400).json({
          errors: [
            {
              msg: 'Invalid Credentials',
            },
          ],
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid Credentials',
            },
          ],
        });
      }

      // Return jsonwebtoken
      //payload stands for serialized JSON data about the user
      const payload = {
        user: {
          //mongoose has an abstraction that allows you to not use user._id
          id: user.id,
        },
      };

      //pass in user id and user's 'secret' as part of the signing
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({
            msg: 'User Logged In',
            token: token,
          });
        }
      );
      //
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
