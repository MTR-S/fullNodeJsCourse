const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

/*
  With mongoose.model() we can export a model based on a schema allowing us to
  create documents in a especific collection. Model() has two paramaters:
  1) The name of the "contructor function"
  2) The schema for this model
*/
module.exports = mongoose.model("Product", productsSchema);

/*
  --> Mongodb nodejs driver:

  const { ObjectId } = require("mongodb");

  const getDb = require("../util/database").getDb;

  class Product {
    constructor(title, price, description, imageUrl, userId) {
      this.title = title;
      this.price = price;
      this.description = description;
      this.imageUrl = imageUrl;
      this.userId = userId;
    }

    async save() {
      const db = getDb();

      try {
        const newProducts = await db.collection("products").insertOne(this);
        console.log(newProducts);
      } catch (err) {
        console.log(err);
      }
    }

    static async delete(prodId) {
      const db = getDb();

      try {
        await db.collection("products").deleteOne({ _id: new ObjectId(prodId) });

        await db
          .collection("users")
          .updateMany(
            { "cart.items.productId": new ObjectId(prodId) },
            { $pull: { "cart.items": { productId: new ObjectId(prodId) } } }
          );

        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }

    static async fetchAll() {
      const db = getDb();

      try {
        const products = await db.collection("products").find({}).toArray();
        return products;
      } catch (err) {
        throw "No products found!";
      }
    }

    static async findById(prodId) {
      const db = getDb();
      console.log(typeof prodId, prodId);

      try {
        const products = await db
          .collection("products")
          .findOne({ _id: new ObjectId(prodId) });

        return products;
      } catch (err) {
        console.error(err);
        throw new Error("No product found!");
      }
    }
  }
*/

/*
const db = require('../util/database');

const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  
  save() {
    
    // When using execute() to write my SQL script, we have to use the '?'
    // to avoid SQL Injection, we have a second parameter that
    //is an array with the data that will be applied in the script
    
    
    const sql = 'INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)';
    const values = [this.title, this.price, this.description, this.imageUrl];
    
    return db.execute(sql, values);
  };
  
  static delete(id) {
    
  };
  
  static fetchAll() {
    return db.execute('SELECT * FROM products');
    
  }; 
  
  static findById(id) {
    const sql = 'SELECT * FROM products WHERE products.id = ?';
    const value = [id];
    
    return db.execute(sql, [id])
  };
};

--> Down below we created a model using sequelize:

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
*/
