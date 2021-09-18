const express = require("express");
const app = express();
const router = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    // set cookie
    req.session.user_id = req.params.id;

    // redirect home
    res.redirect("/");
  });

  return router;
};
