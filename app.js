const express = require('express');
const app = new express();
const ejs = require('ejs');
const path = require('path');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Photo = require('./models/Photo');
app.use(express.static('public'));

// Template Engine
app.set('view engine', 'ejs'); // default views pathine bakılır

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect DB
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
});

// Routes
app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  console.log(photos.length)
  res.render('index', {
    photos: photos
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});
app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  console.log(Photo.find({}))
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port} `);
});
