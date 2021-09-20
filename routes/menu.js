const express = require("express");
const app = express();
const router = express.Router();
// Secure authentication
const bcrypt = require("bcryptjs");

module.exports = (db) => {
  // function to help get user by ID
  const findUserById = function (userId) {
    const queryString = `
    SELECT * FROM users WHERE id = $1
    `;

    return db
      .query(queryString, [userId])
      .then((res) => {
        return res.rows.length > 0 ? res.rows[0] : null;
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  };
  exports.findUserById = findUserById;

  router.get("/", (req, res) => {
    // get user id from cookies
    const userId = req.session.user_id;

    findUserById(userId).then((user) => {
      // get menu items from the db
      const queryText = {
        text: `SELECT * FROM foods;`,
      };

      db.query(queryText)
        .then((data) => {
          data.rows.forEach((e) => console.log(e));
          console.log(data.rows, user);
          const templateVars = { user, data: data.rows };
          res.render("menu", templateVars);
        })
        .catch((err) => console.log({ err: err.message }));
    });

  });

  return router;
};
