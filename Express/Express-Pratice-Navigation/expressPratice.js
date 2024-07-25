const express = require('express');

const app = express(); 

app.use("/users", (req, resp, next) => {
    console.log("I'm the first middleware!");
    resp.send("<h1>Something dummy on the '/users'");
})

app.use("/", (req, resp, next) => {
    console.log("I'm the Last middleware!");
    resp.send("<h1>Something dummy on the '/' or others</h1>");
})

app.listen(8000);