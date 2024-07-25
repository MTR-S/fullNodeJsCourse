/*
Below here is how we import modules using nodejs!
*/
const http = require('http');
const routes = require('./routes')

/*
 The argument of createServer() is
 a function that is call everytime we
 get a response to our server

 The createSerer() function returns
 a instance of a Server
 */

const server = http.createServer(routes.handler);

//process.exit(); This will ended your server!

/*
Listen() is a function that starts a process
where NodeJs will not immediately exit our script
but will instead keep this running to "listen" for
incoming requests! You can tell Node to stop listen
by using the command "process.exit()"
*/ 

server.listen(8000);

/*
    Stream:
    nodejs use the called "stream" method
    to parsed all the incoming requests to the server.
    This stream method separate the data in many parts
    that is called "chuncks". With the chuncks we can
    work with the data even if we don't have all of it.
    
    Buffer:
    nodejs uses the called "buffer" to work with the
    chuncks. Buffer is a memory region that is used to
    temporarily store some data.
 
*/