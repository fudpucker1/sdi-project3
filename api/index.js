require("dotenv").config();

const express = require("express");
const app = express();
const port = 8080;
const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get((req, res) => {
  knex("help_desk_users")
    .select("*")
    .where(`username = ${req.username}`)
    .then((user_info) => {
      if (user_info === null) {
        res.status(404).send("User/Password not found");
      } else if (user_info.password !== req.password) {
        res.status(404).send("User/Password not found");
      } else {
        res.status(200).send("Logging in!");
      }
    });
});

app.post((req, res) => {
  knex("help_desk_users")
    .select("*")
    .where(`username = ${req.body.username}`)
    .then((user) => {
      if (user === null) {
        knex("help_desk_users").insert({
          id: knex("help_desk_users").length + 1,
          username: req.body.username,
          password: req.body.password,
        });
        res
          .status(201)
          .send("Account has been created, welcome aboard Helldiver");
      } else {
        res
          .status(200)
          .send("Username is already in use, please try a different username");
      }
    });
});

app.patch((req, res) => {
  knex("help_desk_users")
    .where(`username = ${req.username}`)
    .update("password", req.password);
  res.status(201).send("Password updated");
});

app.listen(port, () => {
  console.log(`Server is listening to ${port}`);
});
