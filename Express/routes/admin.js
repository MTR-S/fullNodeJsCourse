const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

/*
    on the main app.use() we are passing the
    path "/admin" so all the address will be
    "/admin/..." 
*/

router.get("/add-product", adminController.getAddProduct);

/*
    We can limit the execution of a middleware
    by the http method example: app.post() and
    app.get().
*/

router.post("/add-product", adminController.postAddProducts);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/edit-product", adminController.postEditProducts);

router.post("/delete-product", adminController.postDeleteProducts);

router.get("/products", adminController.getProducts);

module.exports = router;
