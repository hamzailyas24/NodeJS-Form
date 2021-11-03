const express = require("express");

const morgan = require("morgan");

const app = express();

const port = process.env.PORT || 3000;

let users = [];

app.use(express.json());

app.use(morgan("short"));

app.use((req, res, next) => {
  console.log("a request came", req.body);
  next();
});

app.use((req, res, next) => {
  console.log("Request Came");
  next();
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/user/:id", (req, res) => {
  if (users[req.params.id]) {
    res.send(users[req.params.id]);
  } else {
    res.send("user not found");
  }
});

app.post("/user", (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.address) {
    res.status(400).send("Invalid data");
  } else {
    users.push({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
    });

    res.send("users created");
  }
});

app.get("/home", (req, res) => {
  res.send("here is your home");
});

app.get("/", (req, res) => {
  res.send("Hi I am a hello world Server program");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});