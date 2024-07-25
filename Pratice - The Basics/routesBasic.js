const fs = require('fs');

const requestHandler = (req, res) => {
    const reqUrl = req.url;
    const reqMethod = req.method;

    if(reqUrl === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>')
        res.write('<head><title>Greeting</title></head>')
        res.write('<body>');
        res.write('<h1>Hello this is a greeting</h1>');
        res.write('<form method="POST" action="/create-user"><input type="text" name="username"><button>Create User</button></input></form>')
        res.write('</body>');
        res.write('</html>')

        return res.end();
    }

    if(reqUrl === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>')
        res.write('<head><title>Users</title></head>')
        res.write('<body><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul></body>')
        res.write('</html>')
        return res.end();
    }

    if(reqUrl === '/create-user' &&
        reqMethod === 'POST'
    ) {
        const body = [];

        req.on('data', (chunck) => {
            body.push(chunck);
        });
        
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];

            res.statuCode = 302;
            res.setHeader('Location', '/');
            res.end();

            console.log(username);
        })
    }

    res.setHeader('Content-Type', 'text/html');
        res.write('<html>')
        res.write('<head><title>Not Found 404</title></head>')
        res.write('<body><h1>Page not found</h1></body>')
        res.write('</html>')
        res.end();
}

exports.handler = requestHandler;