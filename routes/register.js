const express = require("express");
const app = express();
const router = express.Router();
// Secure authentication
const bcrypt = require("bcryptjs");

const registerRouter = (db) => {
  router.post("/", (req, res) => {

    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let phone_number = req.body.phone_number;
    let email = req.body.email;
    let password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log(first_name, last_name, phone_number, email, hashedPassword);


    if (first_name === "" || last_name === "" || phone_number === "" ||email === "" || password === "") {
      return res.status(400).send("ERROR: First Name/Last Name/Phone Number/Email/Password field cannot be empty.");
    }

    const queryString = `
      INSERT INTO users (first_name, last_name, phone_number, password, email) VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;
    const values = [first_name, last_name, phone_number, hashedPassword, email];
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
module.exports = registerRouter;
