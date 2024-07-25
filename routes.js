const fs = require('fs');

const requestHandler = (req, res) => {
/*
    console.log(req.url, req.method, req.headers);
    */
    const reqUrl = req.url;
    const reqMethod = req.method;

    if(reqUrl === "/") {
        /*
            Here we are manipulating the response
            sending html to the content, for that we use
            setHeader(), after this we use write()
            to write what we want into the response header
            and finally we signal to the server that all of
            the response headers have been sent with end().  
        */
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<head><title>My First Node Response</title></head>");
        res.write('<body><form method="POST" action="/message"><input type="text" name="message"><button>Send</button></input></form></body>');
        res.write("</html>");

        return res.end();
    }

    if(reqUrl === "/message" &&
        reqMethod === "POST"
    ) {
        const body= [];  // Initialy we gonna put all the chuncks here.

        /*
            The on() function is used to config event listeners
            in a response object. On the first argument we have the kind
            of these events: 
                1) 'data': that tracks when a new chunck of data
                is recive;
                2) 'end': that tracks when all the data have been sended;
                3) 'error': that tracks when ocurre an error on the stream.
        */

        req.on('data', (chunck) => {
            body.push(chunck);
        });

        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split("=")[1];

            /* 
                The function writeFileSync() is a synchronous function
                that stops the code execution while creating the file
                that could slow down the server when the file is very big,
                and for that we have another function that is writeFile()
                that don't stop the execution. This function have 3 arguments
                and the third is a function that will be execute after
                the creation of the file
            */
            fs.writeFile("message.txt", message, (err) => {
                if(err) {
                    console.log("An error has been ocurred")
                }
                /*
                    HTTP status code 302: means that the URL of requested
                    resource has been changed temporarily.
                */
                res.statusCode = 302; 
                res.setHeader("Location", "/");
        
                return res.end();
            });
            
        });

    }

    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Node Response</title></head>");
    res.write("<body><h1>CARRRRRRRRRRRRRRRRRRRRALHO</h1></body>");
    res.write("</html>");
    res.end();
}

/*
    Below here is how we can export modules using node
*/

exports.handler = requestHandler;

/*
    Exists other ways to export module using node:
    1) module.export = requestHandler
    2) module.export = {
        handler: requestHandler,
        someText: "Literally some text"
    }
*/