const { ObjectId } = require("mongodb");

const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
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

module.exports = Product;

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
