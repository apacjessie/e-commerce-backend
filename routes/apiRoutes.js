const express = require("express");
const router = express.Router();
const db = require("../database");
const queryString = require("querystring");
const { randomInt } = require("crypto");
const bcrypt = require("bcrypt");
const passport = require("passport");
require("../passportConfig")(passport);

router.use("/user", require("./userRoutes"));
router.use("/admin", require("./adminRoutes"));

router.get("/getProduct/:id", (req, res) => {
  const sql = `SELECT * FROM Products
               INNER JOIN Stocks ON Stocks.product_id = Products.product_id
               WHERE Products.product_id = ?`;
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    if (result.length <= 0) return res.json({ status: "fail" });
    const prod = result[0];
    const sql2 = `SELECT Reviews.created_at AS review_created_at, Reviews.*, Users.*
                  FROM Reviews
                  Inner Join Users On Users.user_id = Reviews.user_id
                  WHERE Reviews.product_id = ?`;
    db.query(sql2, [req.params.id], (err, result) => {
      if (err) throw err;
      const product = {
        id: prod.product_id,
        name: prod.product_name,
        category: prod.product_category,
        gender: prod.product_gender,
        image: prod.product_image,
        price: prod.product_price,
        rate: prod.product_rate,
        count: prod.product_rate_count,
        reviews: [],
        stocks: {
          id: prod.stock_id,
          small: prod.stock_small,
          medium: prod.stock_medium,
          large: prod.stock_large,
          xl: prod.stock_xl,
        },
      };

      for (const row of result) {
        const review = {
          user_id: row.user_id,
          user_email: row.user_email,
          created_at: row.review_created_at,
          review_text: row.review_text,
          review_id: row.review_id,
          review_rating: row.review_rating,
        };
        product.reviews.push(review);
      }

      return res.json(product);
    });
  });
});

router.get("/getRelated/:query", (req, res) => {
  const query = queryString.parse(req.params.query);
  const sql =
    "SELECT * FROM Products WHERE product_category = ? AND product_gender = ?";

  db.query(sql, [query.category, query.gender], (err, result) => {
    if (err) {
      res.status(404);
      throw new Error(err);
    } else {
      const RandomRelated = (arr) => {
        const max = arr.length;
        const randomProducts = [];
        while (randomProducts.length !== 3) {
          const random = Math.floor(Math.random() * max);
          if (!randomProducts.includes(arr[random])) {
            if (arr[random].product_id.toString() !== query.viewed)
              randomProducts.push(arr[random]);
          }
        }
        const products = randomProducts.map((prod) => {
          return {
            id: prod.product_id,
            name: prod.product_name,
            category: prod.product_category,
            gender: prod.product_gender,
            image: prod.product_image,
            price: prod.product_price,
          };
        });
        return products;
      };
      return res.json(RandomRelated(result));
    }
  });
});

router.get("/getProducts", (req, res) => {
  const sql = `SELECT * FROM Products
               INNER JOIN Stocks ON Stocks.product_id = Products.product_id
              `;
  db.query(sql, (err, result) => {
    if (err) throw new Error(err);

    const products = result.map((prod) => {
      return {
        id: prod.product_id,
        name: prod.product_name,
        category: prod.product_category,
        gender: prod.product_gender,
        image: prod.product_image,
        price: prod.product_price,
        stocks: {
          id: prod.stock_id,
          small: prod.stock_small,
          medium: prod.stock_medium,
          large: prod.stock_large,
          xl: prod.stock_xl,
        },
      };
    });
    return res.json(products);
  });
});

router.post("/login", async (req, res, next) => {
  const { body } = req;
  const sql = `SELECT * FROM Users Where user_email = ?`;

  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.json({ message: info.message, status: "fail" });
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.json({ message: info.message, status: "success" });
      });
    }
  })(req, res, next);
});

router.delete("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) throw err;
    res.status(200);
  });
});

router.post("/register", async (req, res) => {
  const { body } = req;
  const address = `${body.street} Barangay ${body.barangay}, ${body.municipality} ${body.province}, ${body.postal}`;
  const fullname = `${body.lastname.toUpperCase()}, ${body.firstname.toUpperCase()} ${body.middleInitial.toUpperCase()}`;
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(body.password, salt);
  const userID = randomInt(100000, 999999);
  const sql = `INSERT INTO Users (user_id, user_fullname, user_email, user_password, user_address, user_mobile) VALUES (?, ?, ?, ?, ?, ?)`;
  const save = db.query(
    sql,
    [userID, fullname, body.email, hashed, address, body.mobile],
    (err, result) => {
      if (err) console.log(err);
      console.log(result);
    }
  );
});

router.post("/no-account-order", async (req, res) => {
  const { client, cart, total } = req.body;
  const address = `${client.street} Barangay ${client.barangay}, ${client.municipality} ${client.province}, ${client.postal}`;
  const fullname = `${client.lastname.toUpperCase()}, ${client.firstname.toUpperCase()} ${client.middleInitial.toUpperCase()}`;
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(client.password, salt);
  const userID = randomInt(100000, 999999);
  const TrackingID = randomInt(10000000, 99999999);

  const sql = `INSERT INTO Users (user_id, user_fullname, user_email, user_password, user_address, user_mobile) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [userID, fullname, client.email, hashed, address, client.mobile],
    (err, result) => {
      if (err) console.log(err);
      cart.forEach((prod) => {
        const orderId = randomInt(1000000, 9999999);
        const q = `INSERT INTO Orders (order_id, user_id, tracking_id ,order_total, order_date, order_status, shipping_address) Values (?, ?, ?, ?, ?, ?, ?)`;
        db.query(
          q,
          [
            orderId,
            userID,
            TrackingID,
            total,
            new Date().toISOString().slice(0, 19).replace("T", " "),
            "pending",
            address,
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
    }
  );
  res.status(200).json({ trackingId: TrackingID });
});

module.exports = router;
