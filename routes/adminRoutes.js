const express = require("express");
const router = express.Router();
const db = require("../database");
const multer = require("multer");
const crypto = require("crypto");
const { randomInt } = crypto;

const storage = multer.diskStorage({
  destination: "images/uploads/",
  filename: (req, file, callback) => {
    // Generate a unique filename by appending the current timestamp to the original filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const originalName = file.originalname;
    const extension = originalName.substring(originalName.lastIndexOf("."));

    callback(null, uniqueSuffix + extension);
  },
});

const upload = multer({ storage });

/// Modify product
router.post("/modify", (req, res) => {
  const { body } = req;
  const { id, name, category, gender, price } = body;

  const sql = `UPDATE Products
                 SET product_name = ?, product_category = ?,
                 product_gender = ?, product_price = ?
                 WHERE product_id = ?`;
  db.query(sql, [name, category, gender, price, id], (err, result) => {
    if (err) throw err;
    if (err) return res.json({ status: "fail" });
    const sql2 = `INSERT INTO Activity (activity_id, activity_message)
                  VALUES (?, ?)`;
    db.query(
      sql2,
      [randomInt(10000, 99999), `Admin modify a product with an id of ${id}`],
      (err, result) => {
        if (err) throw err;
        if (err) return res.json({ status: "fail" });
        return res.json({ status: "success" });
      }
    );
  });
});

// Add product
router.post("/add", upload.single("file"), (req, res) => {
  const { name, category, gender, price } = req.body;
  const imageLink = `http://localhost:3000/images/uploads/${req.file.filename}`;
  const prodID = randomInt(100000, 999999);
  const sql = `INSERT INTO Products 
              (product_id, product_name, product_category, product_gender, product_image, product_price, product_rate)
              VALUES (?, ?, ?, ?, ?, ?, ?)
              `;
  db.query(
    sql,
    [prodID, name, category, gender, imageLink, price, 0.0],
    (err, result) => {
      if (err) throw err;
      if (err) res.json({ status: "fail" });

      const sql2 = `INSERT INTO Stocks (stock_id, product_id, stock_small, stock_medium, stock_large, stock_xl)
                    VALUES (?, ?, ?, ?, ?, ?)`;
      db.query(
        sql2,
        [randomInt(10000, 99999), prodID, 0, 0, 0, 0],
        (err, result) => {
          if (err) throw err;
        }
      );
      const sql3 = `INSERT INTO Activity (activity_id, activity_message)
                      VALUES (?, ?)`;
      db.query(
        sql3,
        [
          randomInt(10000, 99999),
          `Admin add a product with an id of ${prodID}`,
        ],
        (err, result) => {
          if (err) throw err;
        }
      );
      res.json({ status: "success" });
    }
  );
});

/// DELETE Product
router.delete("/delete", (req, res) => {
  const { id } = req.query;
  const sql = `DELETE FROM Products WHERE product_id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (err) return res.json({ status: "fail" });
    const sql2 = `DELETE FROM Stocks WHERE product_id = ?`;
    db.query(sql2, [id], (err, result) => {
      if (err) throw err;
    });
    const sql3 = `INSERT INTO Activity (activity_id, activity_message)
    VALUES (?, ?)`;
    db.query(
      sql3,
      [randomInt(10000, 99999), `Admin delete a product with an id of ${id}`],
      (err, result) => {
        if (err) throw err;
      }
    );
    res.json({ status: "success" });
  });
});

router.get("/getUsers", (req, res) => {
  const sql = `SELECT * FROM Users`;
  db.query(sql, (err, result) => {
    const users = result.map((user) => {
      return {
        id: user.user_id,
        fullname: user.user_fullname,
        email: user.user_email,
        address: user.user_address,
        mobile: user.user_mobile,
        join_at: user.created_at,
      };
    });
    return res.json(users);
  });
});

// Get Customer Order
router.get("/getOrder", (req, res) => {
  const userID = req.query.id;
  const sql = `SELECT * FROM Orders
               INNER JOIN Order_items ON Order_items.order_id = Orders.order_id
               INNER JOIN Products ON Products.product_id = Order_items.product_id
               WHERE Orders.user_id = ?`;
  db.query(sql, [userID], (err, result) => {
    if (err) throw err;
    if (result.length <= 0) return res.json({ status: "fail" });
    const orders = [];
    for (const row of result) {
      const order = {
        order_id: row.order_id,
        user_id: row.user_id,
        tracking_id: row.tracking_id,
        order_total: row.order_total,
        order_date: row.order_date,
        order_status: row.order_status,
        shipping_address: row.shipping_address,
        items: {
          item_id: row.item_id,
          item_qty: row.item_qty,
          item_price: row.item_price,
          item_size: row.item_size,
          product: {
            product_id: row.product_id,
            product_name: row.product_name,
            product_category: row.product_category,
            product_gender: row.product_gender,
          },
        },
      };
      orders.push(order);
    }
    res.json({ status: "success", orders: orders });
  });
});

// Track Customer Order
router.get("/trackOrder", (req, res) => {
  const TrackingID = req.query.id;
  const sql = `SELECT * FROM Orders
               INNER JOIN Order_items ON Order_items.order_id = Orders.order_id
               INNER JOIN Products ON Products.product_id = Order_items.product_id
               WHERE Orders.tracking_id = ?`;
  db.query(sql, [TrackingID], (err, result) => {
    if (err) throw err;
    if (result.length <= 0) return res.json({ status: "fail" });
    const order = {
      order_id: result[0].order_id,
      user_id: result[0].user_id,
      tracking_id: result[0].tracking_id,
      order_total: result[0].order_total,
      order_date: result[0].order_date,
      order_status: result[0].order_status,
      shipping_address: result[0].shipping_address,
      items: [],
    };
    for (const row of result) {
      const item = {
        item_id: row.item_id,
        item_qty: row.item_qty,
        item_price: row.item_price,
        item_size: row.item_size,
        product: {
          product_id: row.product_id,
          product_name: row.product_name,
          product_category: row.product_category,
          product_gender: row.product_gender,
        },
      };
      order.items.push(item);
    }
    res.json({ status: "success", order: order });
  });
});

router.get("/getStock", (req, res) => {
  const id = req.query.id;
  const sql = `SELECT * FROM Stocks 
               INNER JOIN Products ON Products.product_id = Stocks.product_id
               WHERE Stocks.product_id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length <= 0) return res.json({ status: "fail" });
    res.json({ stock: result[0] });
  });
});

// UPDATE STOCK
router.post("/updateStock", (req, res) => {
  const { stock_id, product_id, s, m, l, xl } = req.body;
  console.log(req.body);
  const sql = `UPDATE Stocks
              SET stock_small = ?, stock_medium = ?, stock_large = ?, stock_xl =?
              WHERE stock_id = ?`;
  db.query(sql, [s, m, l, xl, stock_id], (err, result) => {
    if (err) throw err;
    res.json({ status: "success" });
  });
  const sql2 = `INSERT INTO Activity (activity_id, activity_message)
                VALUES (?, ?)`;
  db.query(
    sql2,
    [
      randomInt(10000, 99999),
      `Admin update the stock of product with an id of ${product_id}`,
    ],
    (err, res) => {
      if (err) throw err;
    }
  );
});

// Admin activty
router.get("/activity", (req, res) => {
  const sql = `SELECT * FROM Activity`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ activity: result });
  });
});

module.exports = router;
