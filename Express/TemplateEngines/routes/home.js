const express = require('express');

const router = express.Router();

const users = [];

router.get('/', (req, res, next) => {
    res.status(200).render('home', { pageTitle:"Home Page" });
});

router.post('/', (req, res, next) => {
    users.push( { userName: req.body.userName } );
    res.redirect('/users');
})

exports.routes = router;
exports.listOfUsers = users; 
