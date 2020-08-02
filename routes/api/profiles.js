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

// @route     GET api/profiles/profile/me
// @descrip   Get current users profile
// @access    Private
router.get('/profile/me', auth, async (req, res) => {
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
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/profiles/profile
// @descrip   Create or update user profile
// @access    Private
router.post(
  '/profile',
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

    //Build social object
    profileFields.social = {};
    if (youtube)
      profileFields.social.youtube = youtube;
    if (twitter)
      profileFields.social.twitter = twitter;
    if (facebook)
      profileFields.social.facebook = facebook;
    if (linkedin)
      profileFields.social.linkedin = linkedin;
    if (instagram)
      profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({
        user: req.user.id,
      });
      //if the profile info then...
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile).json;
      }

      //Create
      profile = new Profile(profileFields);
      await profile.save();
      //
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }

    res.send('Hello');
  }
);

// @route     GET api/profiles
// @descrip   Get all profiles
// @access    Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate(
      'user',
      ['name', 'avatar']
    );
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/profiles/profile/user/:user_id
// @descrip   Get profile by user ID
// @access    Public
router.get(
  '/profile/user/:user_id',
  async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.params.user_id,
      }).populate('user', ['name', 'avatar']);

      if (!profile)
        return res.status(400).json({
          msg: 'Profile not found',
        });

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      if (err.kind == 'ObjectId') {
        return res.status(400).json({
          msg: 'Profile not found',
        });
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route     DELETE api/profile
// @descrip   Delete profile, user & posts
// @access    Private

router.delete('/profile', auth, async (req, res) => {
  try {
    // @todo - remove users posts

    // Remove profile
    await Profile.findOneAndRemove({
      user: req.user.id,
    });

    //Remove user
    await User.findOneAndRemove({
      _id: req.user.id,
    });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
