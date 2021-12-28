require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

require("./db/conn");
const app = express();

const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cookieParser());
app.use(require("./router/auth"));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`listing to the port no. ${port}`);
});
