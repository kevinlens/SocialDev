const express = require('express');
//get router tool from express
const router = express.Router();

// @route     GET api/posts
// @descrip   Test Route
// @access    Public
router.get('/', (req, res) => res.send('Posts route'));

module.exports = router;
