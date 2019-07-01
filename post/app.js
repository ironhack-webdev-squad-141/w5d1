const express = require("express");
const app = express();

app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/users", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.listen(3000);
