const express = require('express');
//get router tool from express
const router = express.Router();
const auth = require('../../middleware/authenticateToken');
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

module.exports = router;
