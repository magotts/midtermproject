const express = require("express");
const app = express();
const router = express.Router();
const timeago = require("timeago.js");

// Secure authentication
const bcrypt = require("bcryptjs");
const user = require("./menu");
const {
  findUserById,
  currentUsersOrders,
  getUsersOrderStatus,
} = require("../lib/helper_functions");
const order = require("./order");

// Gets all orders made by current user
module.exports = (db) => {
  // -- GET route for login ---

  router.get("/", (req, res) => {
    const userId = req.session.user_id || "";
    const session = req.session;

    findUserById(db, userId)
      .then((user) => {
        // check if there is use accessing this route
        if (!user || !userId) {
          res.redirect("/");
        }

        // Gather the current users orders
        currentUsersOrders(db, user.id)
          .then((orders) => {
            // Find the status and all the details about the foods
            getUsersOrderStatus(db, user.id)
              .then((ordersInfo) => {
                if (user.id === userId) {
                  const templateVars = {
                    user: user,
                    session,
                    ordersInfo,
                    timeago,
                  };

                  res.render("status", templateVars);
                }
              })
              .catch((err) => {
                res.status(500).json({ error: err.message });
              });
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
