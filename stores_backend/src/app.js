const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// routes
const resources_route = require('./routes/auth/res_route')

const morgan_config = morgan(
  ":method :url :status :res[content-length] - :response-time ms"
);

const app = express();
const port = process.env.PORT;
const cors_config = {
  origin: "*",
};
app.use(cors(cors_config));
app.use(morgan_config);
app.use(express.json());

app.use("/auth", resources_route);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
