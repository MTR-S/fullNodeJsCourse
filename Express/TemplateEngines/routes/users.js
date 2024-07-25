const express = require('express');

const homeData = require('./home');

const router = express.Router();

router.get('/users', (req, res, next) => {
    const users = homeData.listOfUsers;
    res.status(200).render('users', { pageTitle: "Users", users: users });
});

module.exports = router;