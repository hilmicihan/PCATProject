const Express = require('express');
const app = new Express();
const ejs = require('ejs');
const path = require('path');
app.use(Express.static('public'));

// Template Engine
app.set("view engine", "ejs"); // default views pathine bakılır

// Routes
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port} `);
});

