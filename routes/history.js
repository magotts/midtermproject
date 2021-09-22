const express = require("express");
const app = express();
const router = express.Router();
// Secure authentication
const bcrypt = require("bcryptjs");
const user = require("./menu");
const { findUserById, currentUsersOrders } = require("../lib/helper_functions");

module.exports = (db) => {
  // -- GET route for login ---

  router.get("/:id", (req, res) => {
    const userId = req.session.user_id || "";
    console.log("userId:", userId);
    const orderId = req.params.id;

    findUserById(db, userId).then((user) => {
      currentUsersOrders(db, orderId, user.id).then((orders) => {
        // check if there are no current users
        if (!user || !userId) {
          res.redirect("/");
        }
        console.log(orders);
      });
    });
  });

  return router;
};
