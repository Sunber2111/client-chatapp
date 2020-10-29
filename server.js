const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

if (!process.env.NODE_ENV === "production") {
  console.log("production env");
  app.use(express.static("build"));
  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

app.listen(PORT);
