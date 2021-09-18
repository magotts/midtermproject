const express = require("express");
const app = express();
const router = express.Router();
// Secure authentication
const bcrypt = require("bcryptjs");

module.exports = (db) => {
  // ------------ LOGIN FUNCTIONALITY STARTS -----------

  // function that gets users using email to be used for log in
  const findUserByEmail = function (email) {
    const queryString = `
    SELECT * FROM users WHERE users.email = $1
    `;

    return db
      .query(queryString, [email.toLowerCase()])
      .then((res) => {
        console.log(res.rows);
        res.rows.length > 0 ? res.rows[0] : null;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // function that checks password and authenticates user
  const authenticateUser = (email, password) => {
    const user = findUserByEmail(email);

    if (user) {
      const hashedPassword = password;
      console.log(hashedPassword, password);
      if (password === hashedPassword) {
        console.log(user);
        return user.id;
      }
    }
    return false;
  };

  router.post("/", (req, res) => {
    const user_id = req.session.user_id || "";
    
    const { email, password } = req.body;
    if (user_id) {
      res.redirect("/");
    }
    const passQuery = {
      text: `SELECT id, password FROM users WHERE email = $1`,
      values: [email]
    };
    db.query(passQuery)
        .then(data => {
          const fetchUser = data.rows[0];
          console.log(fetchUser);
          if (bcrypt.compareSync(password, fetchUser.password)) {
            req.session.user_id = fetchUser.id;
              res.redirect("/");
          }
        })
        .catch(err => {
          res.status(500).json({ error: err.message });
        });
  });

  // ------------ LOGIN FUNCTIONALITY ENDS -----------

  router.get("/:id", (req, res) => {
    // set cookie
    req.session.user_id = req.params.id;
    console.log(req.session.user_id);
    // redirect home

    res.redirect("/");
  });

  return router;
};
