const express = require('express');
//get router tool from express
const router = express.Router();
// Gravatar will only give a valid Avatar if the associated email has a Gravatar set up at gravatar.com
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route     POST api/users
// @descrip   Register user
// @access    Public
//Posting user input data into the database
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
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
    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({
          errors: [
            {
              msg: 'User already exists',
            },
          ],
        });
      }
      // Get users gravatar
      //mixes users email with these preset and sees if email has avatar set up
      const avatar = gravatar.url(email, {
        //display only the following or lower, s=size, r=rating, d=default
        s: '200',
        r: 'pg',
        d: 'mm',
      });
      //create new user
      user = new User({
        name,
        email,
        avatar,
        password,
      });
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
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
            msg: 'User Registered',
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
