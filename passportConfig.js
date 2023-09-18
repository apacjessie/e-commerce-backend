const db = require("./database");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        const sql = "SELECT * From Users Where user_email = ?";
        db.query(sql, [email], async (err, result) => {
          if (!result[0])
            return done(null, false, {
              message: "No account with that email",
            });

          if (!(await bcrypt.compare(password, result[0].user_password))) {
            return done(null, false, {
              message: "Incorrect email and/or password",
            });
          }

          return done(null, result[0], { message: "Login success" });
        });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.user_id);
  });

  passport.deserializeUser(async (id, done) => {
    const query = "Select * From Users Where user_id = ?";
    db.query(query, [id], (err, result) => {
      if (result[0].user_id) done(null, result[0]);
    });
  });
};
