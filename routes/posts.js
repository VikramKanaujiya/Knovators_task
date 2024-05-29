const express = require('express');
const router = express.Router();
const passport = require('passport');
const Post = require('../models/Post');

// Create Post
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { title, body, latitude, longitude } = req.body;
  try {
    const newPost = new Post({
      title,
      body,
      createdBy: req.user.id,
      geoLocation: { latitude, longitude }
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Read All Posts by Authenticated User
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const posts = await Post.find({ createdBy: req.user.id });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update Post
router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { title, body, active, latitude, longitude } = req.body;
  try {
    const post = await Post.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    post.title = title || post.title;
    post.body = body || post.body;
    post.active = active !== undefined ? active : post.active;
    post.geoLocation = {
      latitude: latitude !== undefined ? latitude : post.geoLocation.latitude,
      longitude: longitude !== undefined ? longitude : post.geoLocation.longitude
    };
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete Post
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json({ msg: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Retrieve Posts by Latitude and Longitude
router.get('/search', async (req, res) => {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
      return res.status(400).json({ msg: 'Latitude and longitude are required' });
    }
    try {
      const posts = await Post.find({
        'geoLocation.latitude': Number(latitude),
        'geoLocation.longitude': Number(longitude)
      });
      res.json(posts);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });
  

module.exports = router;
