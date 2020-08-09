const express = require('express');
//get router tool from express
const router = express.Router();
const {
  check,
  validationResult,
} = require('express-validator');
const auth = require('../../middleware/authenticateToken');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route     POST api/posts
// @descrip   Create a post
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    //If there is an error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      //
      const user = await User.findById(
        req.user.id
      ).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      //to be able to send it back as json
      const post = await newPost.save();

      res.json(post);
      //
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     GET api/posts
// @descrip   GET all posts
// @access    Private

router.get('/', auth, async (req, res) => {
  try {
    //sort through the post with the most recent first
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/posts/:id
// @descrip   GET post by ID
// @access    Private

router.get('/:id', auth, async (req, res) => {
  try {
    //sort through the post with the most recent first
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res
        .status(404)
        .json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res
        .status(404)
        .json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/posts/:id
// @descrip   DELETE a post
// @access    Private

router.delete('/:id', auth, async (req, res) => {
  try {
    //sort through the post with the most recent first
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res
        .status(404)
        .json({ msg: 'Post not found' });
    }

    //Check if user is valid
    if (post.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'User not authorized' });
    }

    await post.remove();

    //
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res
        .status(404)
        .json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route     PUT api/posts/like/:id
// @descrip   Like a post
// @access    Private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if the post has already been like
    //for every like inside of the like.user array, if any one of them has similar id to..., then...
    if (
      //note: 'filter' always creates and returns a new set of array, either empty or not []
      post.likes.filter(
        (like) => like.user.toString() === req.user.id
      ).length > 0
    ) {
      return res
        .status(400)
        .json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     PUT api/posts/unlike/:id
// @descrip   Like a post
// @access    Private

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if the post has already been like
    //for every like inside of the like.user array, if any one of them has similar id to..., then...
    if (
      //note: 'filter' always creates and returns a new set of array, either empty or not []
      post.likes.filter(
        (like) => like.user.toString() === req.user.id
      ).length === 0
    ) {
      return res
        .status(400)
        .json({ msg: 'Post has not yet been liked' });
    }

    //Get/FIND the index of where ever the id is stored (get the current position, aka index, of the specified item)
    const removeIndex = post.likes.map((like) =>
      like.user.toString().indexOf(req.user.id)
    );

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//==============================================================================================

// @route     POST api/posts/comment/:id
// @descrip   Comment on a post
// @access    Private
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    //If there is an error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      //
      const user = await User.findById(
        req.user.id
      ).select('-password');

      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      //to be able to send it back as json
      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
      //
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     DELETE api/posts/comment/:id/:comment_id
// @descrip   Delete a comment
// @access    Private

router.delete(
  '/comment/:id/:comment_id',
  auth,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      //Find every item in comment.id, that has similar id to req.params.cooment_id and store it in array: [{...}]
      const comment = post.comments.find(
        (comment) =>
          comment.id === req.params.comment_id
      );

      // Make sure comment exists
      if (!comment) {
        return res
          .status(404)
          .json({ msg: 'Comment does not exist' });
      }

      // Check if user is authorized
      if (comment.user.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ msg: 'User not authorized' });
      }

      //Get/FIND the index of where ever the id is stored (get the current position, aka index, of the specified item)
      const removeIndex = post.comment.map((comment) =>
        comment.user.toString().indexOf(req.user.id)
      );

      post.comments.splice(removeIndex, 1);

      await post.save();
      console.log(comment);
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
