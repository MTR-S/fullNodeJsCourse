const http = require('http');
const routeBasic = require('./routesBasic');

const server = http.createServer((req, res) => {
    routeBasic.handler(req, res);
});

server.listen(3000);
