const express = require('express');
const router  = express.Router();

module.exports = () => {

  // POST of /logout
  router.post("/", (req, res) => {
    req.session = null;
    res.redirect('/');
  });
  return router;
};
