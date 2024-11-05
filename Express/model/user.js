const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Order = require("../model/order");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  cart: {
    items: [
      {
        _productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = async function (products) {
  const indexOfProductInCart = this.cart.items.findIndex((cartItem) => {
    return cartItem._productId.toString() === products._id.toString();
  });

  const updatedCartItems = [...this.cart.items];

  if (indexOfProductInCart >= 0) {
    updatedCartItems[indexOfProductInCart].quantity += 1;
  } else {
    updatedCartItems.push({ _productId: products._id, quantity: 1 });
  }

  const updatedCart = {
    items: updatedCartItems,
  };

  try {
    this.cart = updatedCart;
    return await this.save();
  } catch (err) {
    console.log(err);
  }
};

userSchema.methods.removeFromCart = async function (productId) {
  const indexOfProductInCart = this.cart.items.findIndex((cartItem) => {
    return cartItem._id.toString() === productId.toString();
  });

  let updatedCartItems = [...this.cart.items];

  if (indexOfProductInCart >= 0) {
    updatedCartItems = this.cart.items.filter((item) => {
      return item._id !== updatedCartItems[indexOfProductInCart]._id;
    });
    console.log(updatedCartItems);
  } else {
    return "Product not found!";
  }

  const updatedCart = {
    items: updatedCartItems,
  };

  try {
    this.cart = updatedCart;
    return await this.save();
  } catch (err) {
    console.log(err);
  }
};

userSchema.methods.addOrderByUser = async function (userId) {
  try {
    await this.populate("cart.items._productId");

    const products = this.cart.items.map((item) => {
      return {
        product: { ...item._productId._doc },
        quantity: item.quantity,
      };
    });

    const order = new Order({
      products: products,
      user: {
        name: this.name,
        _userId: userId,
      },
    });

    await order.save();

    this.cart.items = [];
    await this.save();
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoose.model("User", userSchema);
/*
  --> Using Mongodb Driver:

  const { ObjectId } = require("mongodb");

    const { getDb } = require("../util/database");
    const db = require("../util/database").getDb;

    class User {
      constructor(name, email, password, cart, id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.cart = cart ?? { items: [] };
        this._id = id;
      }

      async saveUser() {
        const db = getDb();

        try {
          return await db.collection("users").insertOne(this);
        } catch (err) {
          console.log(err);
        }
      }

      static async findUserById(userId) {
        const db = getDb();

        try {
          const user = await db
            .collection("users")
            .findOne({ _id: new ObjectId(userId) });
          return user;
        } catch (err) {
          console.log(err);
        }
      }

      async addToCart(products) {
        const indexOfProductInCart = this.cart.items.findIndex((cartItem) => {
          return cartItem.productId.toString() === products._id.toString();
        });

        const updatedCart = [...this.cart.items];

        if (indexOfProductInCart >= 0) {
          updatedCart[indexOfProductInCart].quantity += 1;
        } else {
          updatedCart.push({ productId: new ObjectId(products._id), quantity: 1 });
        }

        console.log(updatedCart);
        const db = getDb();

        try {
          await db
            .collection("users")
            .updateOne(
              { _id: new ObjectId(this._id) },
              { $set: { cart: { items: updatedCart } } }
            );
        } catch (err) {
          console.log(err);
        }
      }

      async getProductFetchingCart() {
        const db = getDb();

        const productsIds = this.cart.items.map((products) => {
          return products.productId;
        });

        try {
          const productsInTheCart = await db
            .collection("products")
            .find({ _id: { $in: productsIds } })
            .toArray();

          return productsInTheCart.map((prods) => {
            return {
              ...prods,
              quantity: this.cart.items.find((item) => {
                return item.productId.toString() === prods._id.toString();
              }).quantity,
            };
          });
        } catch (err) {
          n;
          console.log(err);
        }
      }

      async deleteFromCart(productId) {
        const updatedCart = this.cart.items.filter((product) => {
          return product.productId.toString() !== productId.toString();
        });

        const db = getDb();

        try {
          await db
            .collection("users")
            .updateOne(
              { _id: new ObjectId(this._id) },
              { $set: { cart: { items: updatedCart } } }
            );

          return 0;
        } catch (err) {
          console.log(err);

          return 1;
        }
      }

      async addOrderByUser() {
        const db = getDb();

        try {
          const products = await this.getProductFetchingCart();

          const newOrder = {
            items: products,
            user: {
              name: this.name,
              _id: new ObjectId(this._id),
            },
          };

          await db.collection("orders").insertOne(newOrder);

          await db
            .collection("users")
            .updateOne(
              { _id: new ObjectId(this._id) },
              { $set: { "cart.items": [] } }
            );

          this.cart.items = [];
        } catch (err) {
          console.log(err);
        }
      }

      async getOrderByUser() {
        const db = getDb();

        return await db
          .collection("orders")
          .find({ "user._id": new ObjectId(this._id) })
          .toArray();
      }
    }
*/

/*
  Down below we used sequelize to create a table by a model in mysql:

  const Sequelize = require("sequelize").Sequelize;

  const sequelize = require("../util/database");

  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  module.exports = User;
*/
