const express = require('express');
//get router tool from express
const router = express.Router();

// @route     GET api/users
// @descrip   Test Route
// @access    Public
router.get('/',(req,res) => res.send('User route'));

module.exports = router;