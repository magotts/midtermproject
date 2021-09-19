// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const bcrypt     = require('bcrypt');
const cookieSession = require("cookie-session");

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));
app.use(express.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});


app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {

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


app.get("/menu", (req, res) => {
  res.render("menu");
});


// logout
app.post("/logout", (req, res) => {
  req.session = null;
  // redirect home
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
