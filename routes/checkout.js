const express = require("express");
const app = express();
const router = express.Router();
// Secure authentication
const bcrypt = require("bcryptjs");

const checkoutRouter = (db) => {
  router.post("/", (req, res) => {
    const queryString = `
      SELECT orders`;
    const values = [first_name, last_name, phone_number, password, email];
    return db
      .query(queryString, values)
      .then((result) => {
        req.session.user_id =  result.rows[0].id;
        console.log("cookie is", req.session.user_id);
        console.log("result row is", result.rows[0]);
        res.redirect("/");
      })
      //.then(res.redirect("/"))
      .catch((err) => {
        console.log(err.message);
      });

    //exports.addUser = addUser;



  });

  return router;
};
module.exports = checkoutRouter;
