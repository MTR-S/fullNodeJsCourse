const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://Matheus:ytE9IIotXgZsTjmL@nodejscoursecluster.isodwwr.mongodb.net/shop?retryWrites=true&w=majority&appName=NodeJsCourseCluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run(callbackFunction) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    console.log("You're connected to mongodb!");

    callbackFunction();
  } catch {
    console.dir();
  }
}
/*
    Down below we created a 'pool' to the database
    by doing a function that returns only the database
*/

const getDb = () => {
  if (client.db()) {
    return client.db();
  }
  throw "No database found!";
};

exports.run = run;
exports.getDb = getDb;

/*
--> Here i used sequelize model

const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('node-complete', 'root', 'Papagaio010304$', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;

--> Here i used the mysql module:

    const mysql = require("mysql2");

    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        database: 'node-complete',
        password: 'Papagaio010304$'
    });

    module.exports = pool.promise();
*/
