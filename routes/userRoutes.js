const express = require("express");
const db = require("../database");
const router = express.Router();
const queryString = require("querystring");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { randomInt } = crypto;

// Get authenticated user
router.get("/", (req, res) => {
  if (!req.user) return res.status(401).json();
  // Getting all the user favorites product
  const sql = `Select * From Favorites 
               Inner Join Products On Products.product_id = Favorites.product_id
               Where Favorites.user_id = ?`;
  console.clear();
  db.query(sql, [req.user.user_id], (err, result) => {
    const favorites = [];
    for (const row of result) {
      const favorite = {
        favorite_id: row.favorite_id,
        product_id: row.product_id,
        product_name: row.product_name,
        product_image: row.product_image,
        product_price: row.product_price,
      };
      favorites.push(favorite);
    }
    const sql2 = `Select * From Address Where user_id = ?`;
    db.query(sql2, [req.user.user_id], (err, result) => {
      const addresses = result;
      res.send({ ...req.user, favorites: favorites, addresses: addresses });
    });
  });
  // Getting all the user addressess
});

// POST User change password
router.post("/change-password", (req, res) => {
  const userOldPassword = req.body.user_old_password;
  const userNewPassword = req.body.user_new_password;
  const userID = req.body.user_id;
  const sql = `SELECT * From Users Where user_id = ?`;

  const changePassword = async () => {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(userNewPassword, salt);

    const sql = `UPDATE Users 
                 SET user_password = ?
                 WHERE user_id = ?`;

    db.query(sql, [hashed, userID], (err, result) => {
      if (err) throw err;
      res.json({ message: "Password been changed", status: "success" });
    });
  };

  db.query(sql, [userID], async (err, result) => {
    const user = result[0];
    if ((await bcrypt.compare(userOldPassword, user.user_password)) === true) {
      if (userOldPassword === userNewPassword)
        return res.json({
          message: "Your old and new password are the same",
          status: "fail",
        });
      changePassword();
    } else res.json({ message: "Incorrect old password", status: "fail" });
  });
});

// Get order
router.get("/orders/:query", (req, res) => {
  const query = queryString.parse(req.params.query);
  const sql = `SELECT * From Orders 
               Inner Join Users On Users.user_id = Orders.user_id
               Inner Join Order_items On Order_items.order_id = Orders.order_id
               Inner Join Products On Products.product_id = Order_items.product_id
               Where Orders.user_id = ?
               `;
  db.query(sql, [query.id], (err, result) => {
    if (err) throw err;
    const orders = [];
    for (const row of result) {
      const order = {
        order_id: row.order_id,
        order_total: row.order_total,
        order_date: row.order_date,
        order_status: row.order_status,
        shipping_address: row.shipping_address,
        items: {
          item_id: row.item_id,
          item_qty: row.item_qty,
          item_price: row.item_price,
          product: {
            product_id: row.product_id,
            product_name: row.product_name,
            product_image: row.product_image,
            product_price: row.product_price,
            product_rate: row.product_rate,
          },
        },
      };
      orders.push(order);
    }
    res.json(orders);
  });
});

// Add order
router.post("/order", (req, res) => {
  const { cart, user, total } = req.body;
  console.log(cart);
  const TrackingID = randomInt(10000000, 99999999);
  cart.forEach((prod) => {
    const orderId = randomInt(1000000, 9999999);

    const q = `INSERT INTO Orders (order_id, user_id, tracking_id, order_total, order_date, order_status, shipping_address) Values (?, ?, ?, ?, ?, ?, ?)`;
    db.query(
      q,
      [
        orderId,
        user.user_id,
        TrackingID,
        total,
        new Date().toISOString().slice(0, 19).replace("T", " "),
        "pending",
        user.user_address,
      ],
      (err, result) => {
        if (err) throw err;
      }
    );
    const q2 = `INSERT INTO Order_items (item_id, order_id, product_id, item_qty, item_size, item_price) 
                Values (?, ?, ?, ?, ?, ?)`;
    db.query(
      q2,
      [
        randomInt(1000000, 9999999),
        orderId,
        prod.id,
        prod.qty,
        prod.size,
        prod.price,
      ],
      (err, result) => {
        if (err) throw err;
      }
    );
    let size = "";
    switch (prod.size) {
      case "small":
        size = "stock_small";
        break;
      case "medium":
        size = "stock_medium";
        break;
      case "large":
        large = "stock_large";
        break;
      case "xl":
        xl = "stock_xl";
        break;
    }
    const q3 = `UPDATE Stocks
                SET ${size} = ${size} - ${prod.qty}
                WHERE stock_id = ?`;

    db.query(q3, [prod.stock_id], (err, result) => {
      if (err) throw err;
    });
  });
});

// Add address
router.post("/add_address", (req, res) => {
  const { body } = req;
  const address = `${body.street} Barangay ${body.barangay}, ${body.municipality} ${body.province}, ${body.postal}`;

  // Check address if existed
  const sql = `SELECT * From Address Where user_id = ?`;
  db.query(sql, [body.user_id], (err, result) => {
    if (err) throw err;
    const isExisted = result.map(
      (address) =>
        (address.address_value.toLowerCase().trim() === address) |
        (address.address_name === body.address_name)
    );
    if (isExisted.length)
      return res.json({
        status: "fail",
        message: "Name and/or address already existed!",
      });

    // Add the address
    const sql = `INSERT INTO Address (address_id, user_id, address_name, address_value) Values (?,?,?,?)`;
    db.query(
      sql,
      [randomInt(100000, 999999), body.user_id, body.name, address],
      (err, result) => {
        if (err) throw err;
        return res.json({ status: "success", message: "success" });
      }
    );
  });
});

// Remove Address
router.delete("/remove_address/:query", (req, res) => {
  const query = queryString.parse(req.params.query);
  const userID = parseInt(query.user_id);
  const addressID = parseInt(query.address_id);
  const sql = `Delete from Address Where user_id = ? And address_id = ?`;
  db.query(sql, [userID, addressID], (err, result) => {
    if (err) throw err;
    res.json({ user_id: userID, address_id: addressID });
  });
});

// Add to favorites
router.post("/add_favorite/:query", (req, res) => {
  const query = queryString.parse(req.params.query);
  const sql = `Insert 
               Into Favorites (favorite_id, user_id, product_id) 
               Values (?, ?, ?)`;
  const favID = randomInt(10000, 99999);
  const userID = query.user_id;
  const productID = query.product_id;
  db.query(sql, [favID, userID, productID], (err, result) => {
    if (err) throw err;
    res.json({ favorite_id: favID, user_id: userID, product_id: productID });
  });
});

// Remove to favorites
router.delete("/remove_favorite/:query", (req, res) => {
  const query = queryString.parse(req.params.query);
  const userID = parseInt(query.user_id);
  const productID = parseInt(query.product_id);
  const sql = `Delete from Favorites Where user_id = ? And product_id = ?`;
  db.query(sql, [userID, productID], (err, result) => {
    if (err) throw err;
    res.json({ user_id: userID, product_id: productID });
  });
});

// Add User Reviews and Rate
router.post("/rate_and_review", (req, res) => {
  // Get the user_id and product_id
  // Get the user_rate and user_review
  const { body } = req;

  const sql = `SELECT * From Products Where product_id = ?`;
  db.query(sql, [body.product_id], (err, result) => {
    if (err) throw err;
    const product = result[0];
    let rate = product.product_rate;
    let count = product.product_rate_count + 1;
    rate += body.user_rate / count;

    // Update the product rate and rate count
    const sql2 = `UPDATE Products
                  SET product_rate = ?, product_rate_count = ?
                  WHERE product_id = ?`;
    db.query(sql2, [rate, count, body.product_id], (err, result) => {
      if (err) throw err;
    });
    // Insert into Reviews table
    const sql3 = `INSERT INTO Reviews (review_id, user_id, product_id, review_text, review_rating)
                  VALUES (?, ?, ?, ?, ?)`;
    db.query(
      sql3,
      [
        randomInt(100000, 999999),
        body.user_id,
        body.product_id,
        body.user_review,
        body.user_rate,
      ],
      (err, result) => {
        if (err) throw err;
      }
    );
    return res.json({ status: "success" });
  });
});

// Get user rate and review
// To prevent duplicate review and rate
router.get("/rate_and_review/:query", (req, res) => {
  const query = queryString.parse(req.params.query);
  const sql = `SELECT * from Reviews WHERE user_id = ? AND product_id = ?`;
  db.query(sql, [query.user_id, query.product_id], (err, result) => {
    if (err) throw err;
    // status is true if the user rated and reviewed the product
    if (!result.length) return res.json({ status: false });
    res.json({ status: true });
  });
});

module.exports = router;
