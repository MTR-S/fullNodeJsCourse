const Order = require("../model/order");
const { ObjectId } = require("mongodb");
const Product = require("../model/product");

exports.getProducts = async (req, resp, next) => {
  try {
    const products = await Product.find({});

    resp.render("shop/product-list", {
      prods: products,
      pageTitle: "Products",
      path: "/products",
      isAuthenticated: req.session.isLoggedIn,
    });
  } catch (err) {
    console.dir;
  }
};

exports.getIndex = async (req, resp, next) => {
  try {
    const products = await Product.find();

    resp.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      isAuthenticated: req.session.isLoggedIn,
    });
  } catch (err) {
    console.dir;
  }
};

exports.getCart = async (req, res, next) => {
  try {
    req.user.populate("cart.items._productId").then((user) => {
      const products = user.cart.items;

      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
        isAuthenticated: req.session.isLoggedIn,
      });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postCart = async (req, res, next) => {
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
    await req.user.removeFromCart(prodId);
    res.redirect("/cart");
  } catch (err) {
    console.log(err);
  }
};

exports.postOrder = async (req, res, next) => {
  const userId = req.session.user._id;

  try {
    await req.user.addOrderByUser(userId);

    res.redirect("/orders");
  } catch (err) {
    console.log(err);
  }
};

exports.getOrders = async (req, res, next) => {
  const order = await Order.find({ "user._userId": req.session.user._id });

  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Orders",
    orders: order,
    isAuthenticated: req.session.isLoggedIn,
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
      isAuthenticated: req.session.isLoggedIn,
    });
  } catch {
    console.dir;
  }
};

/*
SEQUELIZE: 
I can use the findAll() method too to make this query:
        Product.findAll({ where: {
            id:searchProductId
        } }) ...
    By doing this the query goes from 'SELECT * FROM products'
    to 'SELECT * FROM products WHERE products.id === searchProductId'
*/
