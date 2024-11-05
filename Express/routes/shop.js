const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

/*
    The ":" tells express that this part of 
    the route will be a dynamic value. Is important
    to have atention while usign dynamic routes 
    beacuse they can stop the flow of your middleware
    if you nedd to access another similar url like 
    /product/delete express will assume that delete
    is the dynamic value and will never render. 
*/

router.get("/products/:productId", shopController.getProduct);

router.post("/cart", shopController.postCart);

router.get("/cart", shopController.getCart);

router.post("/cart-delete-item", shopController.postCartDeleteProduct);

// router.get("/checkout", shopController.getCheckout);

router.post("/create-order", shopController.postOrder);

router.get("/orders", shopController.getOrders);

module.exports = router;
