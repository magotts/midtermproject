const express = require("express");
const router = express.Router();

const placeorderRouter = (db) => {

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

  router.get("/", (req, res) => {
    const user_id = req.session.user_id || "";

    findUserById(user_id)
      .then((user) => {
        let session = req.session;

        const templateVars = { session, user};
        res.render("ordersuccess", templateVars);

      });


  });


  return router;
};

module.exports = placeorderRouter;
