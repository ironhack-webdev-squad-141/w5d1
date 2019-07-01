const express = require("express");
const app = express();

app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true }));

const greetOnRequest = greeting => {
  return (req, res, next) => {
    req.secretKey = "123";
    console.log(greeting);
    next();
  };
};

// app.use(greetOnRequest("Hello there is a new request"));

// app.use(greetOnRequest("Can you see this?"));

const toLowerCase = () => {
  return (req, res, next) => {
    for (const key in req.body) {
      req.body[key] = req.body[key].toLowerCase();
    }
    next();
  };
};

// app.use(toLowerCase());

app.get("/", (req, res) => {
  //   console.log("secret key: ", req.secretKey);
  res.render("index");
});

app.post("/users", toLowerCase(), (req, res) => {
  //   console.log(req.body);
  res.send(req.body);
});

app.listen(3000);
