const express = require('express');
//get router tool from express
const router = express.Router();
const auth = require('../../middleware/authenticateToken');
const {
  check,
  validationResult,
} = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route     GET api/profile/me
// @descrip   Get current users profile
// @access    Private
router.get('/me', auth, async (req, res) => {
  try {
    //find the property with specific id, within Profile Schema
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({
        msg: 'There is no profile for this user',
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/profile/me
// @descrip   Create or update user profile
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      githubusername,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
    } = req.body;

    // Build profile Object
    const profileFields = {};
    //setting the profile to the related user's id
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername)
      profileFields.githubusername = githubusername;
    if (skills) {
      //turn object into an array,trim() removes all whitespaces from string
      profileFields.skills = skills
        .split(',')
        .map((skill) => skill.trim());
    }

    console.log(profileFields.skills);

    res.send('Hello')
  }
);

module.exports = router;
