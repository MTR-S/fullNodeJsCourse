const { ObjectId } = require("mongodb");
const Product = require("../model/product");

exports.getProducts = async (req, resp, next) => {
  /*
        The path.join() function build a perfect single
        path based on all the paths that you pass by argument
        this function can adapt the path based on the 
        operational system. "__direname" will create a relative
        path to the local disk to this file
    */

  /*
        Right now instead of sending a File like this:
        resp.sendFile(path.join(__dirname, "..", "views", "shop.html"));
        We are gonne send using an express built-in functions called 
        response.render(), this function renders a view and sends the rendered HTML
        string to the client. 
    */
  try {
    const products = await Product.find({});

    resp.render("shop/product-list", {
      prods: products,
      pageTitle: "Products",
      path: "/products",
    });
  } catch (err) {
    console.dir;
  }

  /*
        The send() function automaticaly sets a
        html content type by deafault!
    */
};

exports.getIndex = async (req, resp, next) => {
  try {
    const products = await Product.find();

    resp.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  } catch (err) {
    console.dir;
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const products = await req.user.getProductFetchingCart();

    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: products,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postCart = async (req, res, next) => {
  /*
        When we use the POST HTTP method we gain
        acess to the req.body value. Whent we use the GET
        HTTP method we have acess to the req.params value!
    */
  const prodId = req.body.productId;
  try {
    const product = await Product.findById(prodId);

    await req.user.addToCart(product);

    res.redirect("/cart");
  } catch (err) {
    console.log(err);
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    await req.user.deleteFromCart(prodId);

    res.redirect("/cart");
  } catch (err) {
    console.log(err);
  }
};

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/cart", {
//     path: "/checkout",
//     pageTitle: "Checkout",
//   });
// };

exports.postOrder = async (req, res, next) => {
  try {
    await req.user.addOrderByUser();

    res.redirect("/orders");
  } catch (err) {
    console.log(err);
  }
};

exports.getOrders = async (req, res, next) => {
  const order = await req.user.getOrderByUser();
  console.log(order);
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Orders",
    orders: order,
  });
};

exports.getProduct = async (req, res, next) => {
  const searchProductId = req.params.productId;
  try {
    const product = await Product.findById(searchProductId);

    res.render("shop/product-detail", {
      path: "/product" + searchProductId,
      pageTitle: "Product Details",
      product: product,
    });
  } catch {
    console.dir;
  }

  /*
  SEQUELIZE: 
  I can use the findAll() method too to make this query:
          Product.findAll({ where: {
              id:searchProductId
          } }) ...
      By doing this the query goes from 'SELECT * FROM products'
      to 'SELECT * FROM products WHERE products.id === searchProductId'
  */
};
