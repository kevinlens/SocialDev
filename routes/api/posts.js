const express = require('express');
//get router tool from express
const router = express.Router();
const {
  check,
  validationResult,
} = require('express-validator');
const auth = require('../../middleware/authenticateToken');

// @route     POST api/posts
// @descrip   Create a post
// @access    Private
router.get(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty(),
    ],
  ],
  async(req, res) => {}
);

module.exports = router;
