const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./build"));
  app.use("*", express.static("./build"));
}
app.listen(PORT);
