const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const connection = require("./database"); 
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async ( profile, done) => {
      try {
        const email = profile.emails[0].value;
        const query = "SELECT * FROM users WHERE gmail = ?";
        connection.query(query, [email], (error, results, fields) => {
          if (error) {
            return done(error);
          }

          if (results.length > 0) {
            const user = results[0];
            user.role_id = user.role_id;
            user.name = user.name;
            console.log(user.role_id)
            console.log(user.name)
            return done(null, user);
          } else {
            return done(null, false, { message: "You are not accessible" });
          }
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

module.exports = passport;
