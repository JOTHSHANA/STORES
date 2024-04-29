const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const passportConfig = require("./config/passport")
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// routes
const resources_route = require("./routes/auth/res_route");
const auth_route = require("./routes/auth/auth");

const morgan_config = morgan(
  ":method :url :status :res[content-length] - :response-time ms"
);

const app = express();
const port = process.env.PORT;

// session handle
app.use(
  session({
    secret: "this is my secrect code",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const cors_config = {
  origin: "*",
};
app.use(cors(cors_config));
app.use(morgan_config);
app.use(express.json());

// routes
app.use("/auth", resources_route);
app.use("/auth", auth_route);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
