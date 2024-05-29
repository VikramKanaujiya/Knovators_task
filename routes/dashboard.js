const express = require('express');
const router = express.Router();
const passport = require('passport');
const Post = require('../models/Post');

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const activeCount = await Post.countDocuments({ createdBy: req.user.id, active: true });
    const inactiveCount = await Post.countDocuments({ createdBy: req.user.id, active: false });
    res.json({ activeCount, inactiveCount });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
