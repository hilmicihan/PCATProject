const express = require('express');
const app = new express();
const ejs = require('ejs');
const path = require('path');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const photoController = require('./controllers/photoController');
const pageController = require('./controllers/pageController');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Photo = require('./models/Photo');
app.use(express.static('public'));

// Template Engine
app.set('view engine', 'ejs'); // default views pathine bakılır

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// use file upload module to upload files
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['GET', 'POST'],
  })
);

// connect DB
mongoose
  .connect(
    'mongodb+srv://hilmi:123456hcy.@cluster0.3ww0g.mongodb.net/pcat-app?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log('DB CONNECTED!');
  })
  .catch((error) => {
    console.log(error);
  });

// Routes
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getPhotoAddPage);
app.get('/photos/edit/:id', pageController.getPhotoEditPage);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port} `);
});
