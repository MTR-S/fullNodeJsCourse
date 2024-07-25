const path = require('path');

const homeRoutes = require('./routes/home');
const userRoutes = require('./routes/users');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(bodyParser.urlencoded({ extended:false }));


app.use(homeRoutes.routes);
app.use(userRoutes);

app.use((req, res, next) => {
});

app.listen(3000);