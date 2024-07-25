const Product = require("../model/product");

exports.getAddProduct = (req, resp, next) => {
  resp.render("admin/edit-product", {
    pageTitle: "Add Products",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProducts = async (req, resp, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;

  const newProduct = new Product(title, price, description, imageUrl);
  try {
    await newProduct.save();
    resp.redirect("/admin/products");
  } catch (err) {
    throw "Can't add this Product";
  }
};

// exports.getEditProduct = (req, resp, next) => {
//   const editMode = req.query.edit === "true";

//   if (!editMode) {
//   }

//   const productId = req.params.productId;

//   req.user
//     .getProducts({ where: { id: productId } })
//     .then((products) => {
//       const product = products[0];

//       if (!product) {
//         return resp.redirect("/");
//       }
//       resp.render("admin/edit-product", {
//         pageTitle: "Edit Products",
//         path: "/admin/edit-product",
//         editing: editMode,
//         product: product,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// exports.postEditProducts = (req, res, next) => {
//   const prodId = req.body.productId;

//   const updatedTitle = req.body.title;
//   const updatedPrice = req.body.price;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedDesc = req.body.description;
//   const updatedProduct = new Product(
//     prodId,
//     updatedTitle,
//     updatedImageUrl,
//     updatedDesc,
//     updatedPrice
//   );

//   Product.findByPk(prodId)
//     .then((product) => {
//       product.title = updatedTitle;
//       product.price = updatedPrice;
//       product.imageUrl = updatedImageUrl;
//       product.description = updatedDesc;
//       return product.save();
//     })
//     .then(() => {
//       res.redirect("/admin/products");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// exports.getProducts = (req, resp, next) => {
//   req.user
//     .getProducts()
//     .then((products) => {
//       resp.render("admin/products", {
//         prods: products,
//         pageTitle: "Admin Products",
//         path: "/admin/products",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// exports.postDeleteProducts = (req, res, next) => {
//   const prodId = req.body.productId;

//   Product.destroy({
//     where: {
//       id: prodId,
//     },
//   })
//     .then(() => {
//       res.redirect("/admin/products");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
