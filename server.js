const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./config/passport')(passport);
const authUser = require('./routes/auth');
const allPosts = require('./routes/posts');
const dashboardCount = require('./routes/dashboard');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());


// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authUser);
app.use('/api/posts', allPosts);
app.use('/api/dashboard', dashboardCount);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
