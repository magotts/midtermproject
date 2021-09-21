const express = require("express");
const app = express();
const router = express.Router();
// Secure authentication
let cart = [
  {
    items: {
      pizzaId: {
        item: {
          id: 1245,
          title: "Ham and Cheese",
          price: 10,
          stock: 5,
          description: "Loads of ham and cheese!",
          image_url:
            "https://st.focusedcollection.com/11312302/i/650/focused_149485796-stock-photo-whole-ham-cheese-and-pizza.jpg",
        },
        qty: 4,
      },
      totalQty: 4,
      totalPrice: 40,
    },
  },
  {
    items: {
      pizzaId: {
        item: {
          id: 1745,
          title: "Vegan Pizza",
          price: 152,
          stock: 20,
          description: "For Vegetarians only",
          image_url:
            "https://www.noracooks.com/wp-content/uploads/2020/07/IMG_3147.jpg",
        },
        qty: 3,
      },
      totalQty: 3,
      totalPrice: 456,
    },
  },
  {
    items: {
      pizzaId: {
        item: {
          id: 1853,
          title: "Mushroom Pesto Pizza",
          price: 15,
          stock: 20,
          description: "Loaded with Mushrooms in Pesto Sauce",
          image_url:
            "https://jessicalevinson.com/wp-content/uploads/2017/03/IMG_4217.jpg",
        },
        qty: 5,
      },
      totalQty: 5,
      totalPrice: 75,
    },
  },
  {
    items: {
      pizzaId: {
        item: {
          id: 13454,
          title: "Sausage Pizza",
          price: 12,
          stock: 20,
          description: "Sausage lovers",
          image_url:
            "https://farm8.staticflickr.com/7570/16322889876_1fd5ee221e_o.jpg",
        },
        qty: 4,
      },
      totalQty: 4,
      totalPrice: 48,
    },
  },
];

const checkoutRouter = (db) => {
  router.get("/", (req, res) => {
    const queryString = `SELECT foods.title, foods.price, order_details.quantity
    FROM foods
    JOIN order_details ON order_details.foods_id = foods.id
    JOIN orders ON order_details.orders_id = orders.id
    WHERE orders_id = 3`;
    return db
      .query(queryString)
      .then((result) => {
        console.log("result row is", result.rows);
        const templateVars = { data: result.rows, user: null };
        res.render("checkout.ejs", templateVars);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  //delete an item
  router.post("/checkout/:foods_id/delete", (req, res) => {
    const foodsId = req.params.foods_id;
    const queryString = `
    delete`;
    return db
      .query(queryString)
      .then((result) => {
        console.log("result row is", result.rows);
        // const templateVars = {data: result.rows};
        // res.render('checkout.ejs', templateVars);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  return router;
};
module.exports = checkoutRouter;
