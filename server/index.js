const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

// Database connection:
require("./db-connection");

/**
 * Server Middlewares:
 */

// Server allow cors:
app.use(cors());

// Express parsers:
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Server Public folder
app.use(express.static("public"));

// Server routes:
app.use("/user", require("./routes/users"));

// Server redirect on GETing "/api":
app.get("/api", (req, res) => {
  res.writeHead(302, {
    Location: "/",
  });
  res.send();
});

// Server error handling:
app.use(errorHandler);

// Server starts listening ..:
const port = process.env.PORT;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));

/* ----------------------- Handlers ------------------------ */
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.send({
    logError: typeof err === "string" ? err : err.message,
    message: "Internal Server Error",
  });
}
