const path = require("path");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
// const pageNotFoundController = require("./controllers/404");
const mongoose = require("mongoose");
// const User = require("./model/user");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
/*
use() is bassically the place where
you can set the logical of the function that will
be executed by the createServer(). use() paramaters
are 3:
1) request
2) response
3) next that is the function that will
enable that other middleware execute, without
next() only the first middleware block will
be executed.
It is important to understand that when you use a path while
using use() the path doesen't nedd to be exactly equal to be accepted
,example: When you use "/" all your middlewares will be
discarted beacuse all routes starts with / so use() will not look
at the others characters even if its complete diferent. But you can 
resolve this problem by using the app.METHOD() instead use().
*/

/*
What is a middleware:
When using express.js we call middleware the functions
that have acess to the objects request and response and 
to the next middleware function represented by the 
variable "next". Is important to remebember that the
order that you put your middlewares on your code will
affect the result!
*/

/*
With the app.set() working with template engine
we have to first set to node.js what engine we will
use and then we set the file or an array of files
that are this template views
*/

app.set("view engine", "ejs");
app.set("views", "Express/views");

/*
Parse the content on the body of 
the request and at its final call
next() to enter our middleware nodes
urlencoded() is a function that parse the body 
of a request

*/

app.use(bodyParser.urlencoded({ extended: false }));

/*
The express.static() is used to serve static files like HTML
CSS and Javascript, etc that dosen't need a dynamic processing 
on the server. This function map system folders to a URL address.
This allows you to serve this files direct to the client.
*/

app.use(express.static(path.join(__dirname, "public")));
/*
There is another way to filter your path
by passing the first part of the url to the main
app.use(). In this exemple below we have 
app.use("/admin", adminRoutes) that "/admin"
will be apllied to all the routes inside adminRoutes
thereofere "/admin" will be checked only one time.
*/

// app.use(async (req, res, next) => {
//   req.user = await User.findUserById("66a8e5e202b1f08b997cd7ec");
//   req.user = new User(
//     req.user.name,
//     req.user.email,
//     req.user.password,
//     req.user.cart,
//     req.user._id
//   );

//   next();
// });

app.use("/admin", adminRoutes);

app.use(shopRoutes);

// app.use(pageNotFoundController.get404);

mongoose
  .connect(
    "mongodb+srv://Matheus:ytE9IIotXgZsTjmL@nodejscoursecluster.isodwwr.mongodb.net/shop?retryWrites=true&w=majority&appName=NodeJsCourseCluster"
  )
  .then(() => {
    app.listen(3000);
    console.log("You are connected to Mongodb by Mongoose!");
  })
  .catch((err) => console.log(err));

/*
First we install express.js with the follow comand
"npm install --save express" 
note that is used --save and not --save-dev 
beacuse express.js is a production dependecy
*/

//npm install --save express-handlebars@3.0

/*
This is the part that i used SQL and sequelize with nodejs.

const Product = require("./model/product");
const User = require("./model/user");
const Cart = require("./model/cart");
const CartItem = require("./model/cart-item");
const Order = require("./model/order");
const OrderItem = require("./model/order-item");

Simple query example with Promise Wrapper:
db.execute('SELECT * FROM products')
.then(result => {
  console.log(result);
})
.catch(err => {
  console.log(err);
});


// Database Associations:

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, { through: OrderItem });

sequelize
  
        // When added the 'force' pramater into the syns() function 
        // this tells sequelize to rebuild the the tables everytime 
        // the server restarts. This is recommended to stay only in 
        // production!
    
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Matheus",
        email: "matheusalmeidass14@gmail.com",
        password: "123",
      });
    }
    return user;
  })
  .then((user) => {
    if (user.getCart()) {
      return user.createCart();
    }
    return;
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
*/
