const express = require("express");
const app = express();
const router = express.Router();
// Secure authentication
const bcrypt = require("bcryptjs");

module.exports = (db) => {
  // -- GET route for login ---

  // Display the login form, but first check if user is logged in.
  // If they're logged in, redirect to homepage
  router.get("/", (req, res) => {
    if (req.session.user_id) {
      return res.redirect("/");
    }
    const templateVars = { user: null, message: null };
    res.render("login", templateVars);
  });

  // function that gets users using email - to be used to match db and authenticate only
  const findUserByEmail = function (email) {
    const queryString = `
    SELECT * FROM users WHERE users.email = $1
    `;

    return db
      .query(queryString, [email.toLowerCase()])
      .then((res) => {
        return res.rows.length > 0 ? res.rows[0] : null;
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  };
  exports.findUserByEmail = findUserByEmail;

  // function that checks password and authenticates user based on findUserByEmail
  const authenticateUser = (email, password) => {
    const user = findUserByEmail(email);
    return findUserByEmail(email).then((user) => {
      if (!user) {
        return null;
      }
      console.log("finduserby email:", user, email, password);
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
  };

  exports.authenticateUser = authenticateUser;

  // Post request that authenticates and redirects to homepage
  router.post("/", (req, res) => {
    const user_id = req.session.user_id || "";
    const { email, password } = req.body;

    // check if email or password exists, if not send alert
    if (!email || !password) {
      res.status(403);
      const vals = {
        message: "Please enter an email and a password",
        messageClass: "alert-danger",
        user: null,
      };

      res.render("login", vals);
    }

    // start authentication process
    authenticateUser(email, password)
      .then((user) => {
        console.log("Here is User:", user);

        // If authenticate user returns null
        if (!user || req.session.user_id) {
          res.status(401).render("login", {
            message: "Your username or password is incorrect",
            messageClass: "alert-danger",
            user: null,
          });
          return;
        }
        req.session.user_id = user.id;
        if (req.session.user_id) {
          res.redirect("/");
        }

        // --- FOR admin ---

        // if (req.session.user_id && user.admin === true ) {
        //   IMPLEMENT ADMIN FUNCTIONALITY
        // }

        // ---- TO SEND ANY OF THE AUTHENTICATED USER'S INFO ANYWHERE ----
        // res.send({ user: { name: user.name, email: user.email, id: user.id } });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
