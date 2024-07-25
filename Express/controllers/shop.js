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
    const products = await Product.fetchAll();

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
    const products = await Product.fetchAll();

    resp.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  } catch (err) {
    console.dir;
  }
};

// exports.getCart = (req, res, next) => {
//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart.getProducts();
//     })
//     .then((products) => {
//       res.render("shop/cart", {
//         path: "/cart",
//         pageTitle: "Your Cart",
//         products: products,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// exports.postCart = (req, res, next) => {
//   /*
//         When we use the POST HTTP method we gain
//         acess to the req.body value. Whent we use the GET
//         HTTP method we have acess to the req.params value!
//     */

//   const prodId = req.body.productId;
//   let fetchedCart;
//   let newQuantity = 1;
//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       return cart.getProducts({ where: { id: prodId } });
//     })
//     .then((products) => {
//       let product;
//       if (products.length > 0) {
//         product = products[0];
//       }
//       if (product) {
//         const oldQuantity = product.cartItem.quantity;
//         newQuantity = oldQuantity + 1;
//         return product;
//       }
//       return Product.findByPk(prodId);
//     })
//     .then((product) => {
//       return fetchedCart.addProduct(product, {
//         through: { quantity: newQuantity },
//       });
//     })
//     .then(() => {
//       res.redirect("/cart");
//     })
//     .catch((err) => console.log(err));
// };

// exports.postCartDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;

//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart.getProducts({ where: { id: prodId } });
//     })
//     .then((products) => {
//       const product = products[0];
//       return product.cartItem.destroy();
//     })
//     .then(() => {
//       res.redirect("/cart");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/cart", {
//     path: "/checkout",
//     pageTitle: "Checkout",
//   });
// };

// exports.postOrder = (req, res, next) => {
//   let fetchedCart;

//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       return cart.getProducts();
//     })
//     .then((products) => {
//       return req.user
//         .createOrder()
//         .then((order) => {
//           order.addProducts(
//             products.map((product) => {
//               product.orderItem = {
//                 quantity: product.cartItem.quantity,
//               };
//               return product;
//             })
//           );
//         })
//         .catch((err) => console.log(err));
//     })
//     .then((result) => {
//       return fetchedCart.setProducts(null);
//     })
//     .then(() => {
//       res.redirect("/orders");
//     })
//     .catch((err) => console.log(err));
// };

// exports.getOrders = (req, res, next) => {
//   req.user
//     .getOrders({ include: ["products"] })
//     .then((orders) => {
//       res.render("shop/orders", {
//         path: "/orders",
//         pageTitle: "Orders",
//         orders: orders,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

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
  I can use the findAll() method too to make this query:
          Product.findAll({ where: {
              id:searchProductId
          } }) ...
      By doing this the query goes from 'SELECT * FROM products'
      to 'SELECT * FROM products WHERE products.id === searchProductId'
  */
};
