const Product = require("../model/product");

const { ObjectId } = require("mongodb");
const getDb = require("../util/database").getDb;

exports.getAddProduct = (req, resp, next) => {
  resp.render("admin/edit-product", {
    pageTitle: "Add Products",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProducts = (req, resp, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;

  const product = new Product({
    title,
    price,
    description,
    imageUrl,
  });

  product
    .save()
    .then(() => {
      resp.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = async (req, resp, next) => {
  const editMode = req.query.edit === "true";

  if (!editMode) {
    return resp.redirect("/");
  }

  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return resp.redirect("/");
    }
    resp.render("admin/edit-product", {
      pageTitle: "Edit Products",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postEditProducts = async (req, res, next) => {
  const prodId = req.body.productId;

  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  try {
    const product = await Product.findByIdAndUpdate(prodId, {
      title: updatedTitle,
      price: updatedPrice,
      imageUrl: updatedImageUrl,
      description: updatedDesc,
    });

    res.redirect("/");
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).send("Failed to update product");
  }
};

exports.getProducts = async (req, resp, next) => {
  try {
    const products = await Product.find({});

    resp.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postDeleteProducts = async (req, res, next) => {
  const prodId = req.body.productId;

  try {
    const prodState = await Product.findByIdAndDelete(prodId);

    prodState
      ? console.log("Sucess! Product Deleted.")
      : console.log("Cant Deleted this Product");

    res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
  }
};
