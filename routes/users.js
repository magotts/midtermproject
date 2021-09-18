/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');

module.exports = (db) => {

  // function that gets users using email to be used for log in
  const findUserByEmail = function (email) {
    const queryString = `
    SELECT * FROM users WHERE users.email = $1
    `;
    return db
      .query(queryString, [email.toLowerCase()])
      .then((res) => (res.rows.length > 0 ? res.rows[0] : null))
      .catch((err) => {
        console.log(err.message);
      });
  };
  exports.findUserByEmail = findUserByEmail

  // function that checks password and authenticates user
  const authenticateUser = (email, password) => {
    const user = findUserByEmail(email);
    if (user) {
      const hashedPassword = user.password;
      if (bcrypt.compareSync(password, hashedPassword)) {
        return user.id;
      }
    }

    return false;
  };
  exports.authenticateUser = authenticateUser
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
