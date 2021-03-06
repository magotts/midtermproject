const express = require("express");
const router = express.Router();
const sendSms = require("../public/scripts/api/twilio");
const { findUserById } = require("../lib/helper_functions");

const adminRouter = (db) => {
  router.get("/", (req, res) => {
    const userId = req.session.user_id;
    const session = req.session;

    // const templateVars = {user: null}
    findUserById(db, userId).then((user) => {
      // make sure the current user is admin
      if (user && userId && user.admin) {
        res.render("admins.ejs", { user });
      }
      // else render a 404 page
      else if (user && userId) {
        const templateVars = {
          message: "Oops! Looks like you were trying to access the wrong page.",
          messageClass: "alert-danger",
          user: user,
          session,
        };
        res.render("404.ejs", templateVars);
      } else {
        const templateVars = {
          message: "Oops! Looks like you were trying to access the wrong page.",
          messageClass: "alert-danger",
          user: null,
        };
        res.status(404).render("404.ejs", templateVars);
      }
    });
  });

  //GET /admins
  router.get("/orders", (req, res) => {
    // get current user's id from session
    const userId = req.session.user_id;
    const session = req.session;

    // find session user from the db
    findUserById(db, userId).then((user) => {
      if (user.admin) {
        db.query(
          `SELECT * FROM orders
        ORDER BY order_time DESC;`
        )
          .then((response) => {
            res.json(response.rows);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      // else render a 404 page
      else if (user && userId) {
        const templateVars = {
          message: "Oops! Looks like you were trying to access the wrong page.",
          messageClass: "alert-danger",
          user: user,
          session,
        };
        res.status(404).render("404.ejs", templateVars);
      } else {
        const templateVars = {
          message: "Oops! Looks like you were trying to access the wrong page.",
          messageClass: "alert-danger",
          user: null,
        };
        res.status(404).render("404.ejs", templateVars);
      }
    });
  });

  router.post("/orders/:id", (req, res) => {
    const userId = req.session.user_id;
    const session = req.session;
    const { estimatedTime } = req.body;
    const id = req.params.id;

    findUserById(db, userId).then((user) => {
      if (user.admin) {
        db.query(`SELECT * FROM orders WHERE id = $1`, [id]).then(
          (response) => {
            // res.json(response.rows);
            const record = response.rows[0];
            // update db with estimated time value
            db.query(
              `UPDATE orders
      SET order_estimation = ${estimatedTime},
      order_status = 'accepted'
      WHERE id=${id}
      RETURNING order_estimation`
            ).then((response) => {

              const orderIsReady = response.rows[0].order_estimation;
              sendSms(`Your order will be ready in ${orderIsReady}minutes.`);
              res.json(response);
            });

          });
      }
      // else render a 404 page
      else if (user && userId) {
        const templateVars = {
          message: "Oops! Looks like you were trying to access the wrong page.",
          messageClass: "alert-danger",
          user: user,
          session,
        };
        res.status(404).render("404.ejs", templateVars);
      } else {
        const templateVars = {
          message: "Oops! Looks like you were trying to access the wrong page.",
          messageClass: "alert-danger",
          user: null,
        };
        res.status(404).render("404.ejs", templateVars);
      }
    });
  });

  router.post("/del/:id", (req, res) => {
    const userId = req.session.user_id;
    const session = req.session;
    const orderId = req.params.id;

    findUserById(db, userId).then((user) => {
      if (user.admin) {
        db.query(
          `UPDATE orders SET order_status = 'declined' WHERE id=${orderId} RETURNING order_status`
        ).then((response) => {

          db.query(`SELECT first_name from users JOIN orders ON orders.user_id = users.id WHERE orders.id = ${orderId} `).then((result) => {
            const name = result.rows[0].first_name;

            sendSms(`We're sorry ${name}, unfortunately the restaurant has declined your order.`);
            res.json(result);
          })
        });
      }
      // else render a 404 page
      else if (user && userId) {
        const templateVars = {
          message: "Oops! Looks like you were trying to access the wrong page.",
          messageClass: "alert-danger",
          user: user,
          session,
        };
        res.status(404).render("404.ejs", templateVars);
      } else {
        const templateVars = {
          message: "Oops! Looks like you were trying to access the wrong page.",
          messageClass: "alert-danger",
          user: null,
        };
        res.status(404).render("404.ejs", templateVars);
      }
    });
  });

  router.post("/complete/:id", (req, res) => {
    const userId = req.session.user_id;
    const session = req.session;
    const orderId = req.params.id;

    findUserById(db, userId).then((user) => {

      if (user.admin) {
        db.query(
          `UPDATE orders SET order_status = 'completed' WHERE id=${orderId} RETURNING order_status`
        ).then((response) => {

          db.query(`SELECT first_name from users JOIN orders ON orders.user_id = users.id WHERE orders.id = ${orderId} `).then((result) => {
            const name = result.rows[0].first_name;
            sendSms(`Thank you for your order ${name}, please enjoy your food!`);
            res.json(result);
          })
        });
      }
      // else render a 404 page
      else if (user && userId) {
        const templateVars = {
          message: "Oops! Looks like you were trying to access the wrong page.",
          messageClass: "alert-danger",
          user: user,
          session,
        };
        res.status(404).render("404.ejs", templateVars);
      } else {
        const templateVars = {
          message: "Oops! Looks like you were trying to access the wrong page.",
          messageClass: "alert-danger",
          user: null,
        };
        res.status(404).render("404.ejs", templateVars);
      }
    });
  });

  return router;
};

module.exports = adminRouter;
