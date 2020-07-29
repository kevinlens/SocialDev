const express = require('express');
//get router tool from express
const router = express.Router();

// @route     GET api/auth
// @descrip   Test Route
// @access    Public
router.get('/',(req,res) => res.send('Auth route'));

module.exports = router;