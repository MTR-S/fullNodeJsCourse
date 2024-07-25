const path = require('path');

const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use("/users", (req, resp, next) => {
    resp.sendFile(path.join(__dirname, "htmlFiles", "users.html"));
});

app.use("/", (req, resp, next) => {
    resp.sendFile(path.join(__dirname, "htmlFiles", "home.html"));
});

app.listen(3000);