const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;


mongoose.connect('mongodb+srv://rishi:rishi@cluster0.tswam8g.mongodb.net/');
const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model('Post', postSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  
  Post.find({}, (err, posts) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { posts: posts });
    }
  });
});

app.post('/post', (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content
  });

  newPost.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
