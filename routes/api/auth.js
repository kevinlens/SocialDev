const express = require('express');
//get router tool from express
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
// @route     GET api/auth
// @descrip   Test Route
// @access    Public
router.get('/', auth, async (req, res) => {
  try {
    //req.user is from auth.js setting it to an ID
    const user = await User.findById(
      req.user.id
    ).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
