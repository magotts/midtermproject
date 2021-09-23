// Secure authentication
const bcrypt = require("bcryptjs");
// function to help get user by ID from the database
const findUserById = function (db, userId) {
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

// ---------------------- //

// function that checks password and authenticates user based on findUserByEmail
const authenticateUser = (email, password, db) => {
  // const user = findUserByEmail(db, email);
  return findUserByEmail(db, email).then((user) => {
    if (!user) {
      return null;
    }
    // console.log("finduserby email:", user, email, password);
    if (bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  });
};

exports.authenticateUser = authenticateUser;

// ---------------------- //

// function that gets users using email - to be used to match db and authenticate only
const findUserByEmail = function (db, email) {
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

const currentUsersOrders = function (db, userId) {
  const queryText = {
    text: `SELECT * FROM orders WHERE user_id=$1`,
    values: [userId],
  };

  return db.query(queryText).then((orders) => {
    return orders.rows.length > 0 ? orders.rows : null;
  });
};
exports.currentUsersOrders = currentUsersOrders;


const getUsersOrderStatus = function (db, userId) {
  const queryText = {
    text: `SELECT * FROM orders
    JOIN order_details ON orders.id = orders_id JOIN users ON users.id=user_id
    WHERE user_id = $1 ORDER BY order_time DESC;`,
    values: [userId],
  };

  return db.query(queryText).then((orders) => {
    return orders.rows.length > 0 ? orders.rows : null;
  });
};
exports.getUsersOrderStatus = getUsersOrderStatus;
