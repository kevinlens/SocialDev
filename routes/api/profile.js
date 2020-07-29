const express = require('express');
//get router tool from express
const router = express.Router();

// @route     GET api/profile
// @descrip   Test Route
// @access    Public
router.get('/',(req,res) => res.send('Profile route'));

module.exports = router;