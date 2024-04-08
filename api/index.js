require("dotenv").config();

const express = require("express");
const app = express();
const port = 8080;
const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

app.use(express.json());
app.use(cookieParser());
app.use(
  cookieSession({
    name: "user_session",
    httpOnly: true,
    sameSite: "strict",
    secret: process.env.secret,
  })
);

const user_info = [
  {
    username: "chuck",
    password: "password"
  }
]
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.post('/login', (req, res) => {
  knex("help_desk_users")
    .select("*")
    .where(`username = ${req.username}`)
    .then((user_info) => {
      if (user_info === null) {
        res.status(404).send("User/Password not found");
      } else if (user_info.password !== req.password) {
        res.status(404).send("User/Password not found");
      } else {
        req.session.username = req.body.username;
        res.status(200).send("Logging in!").cookie();
      }
    });
});

{/* <li><Link to="/login">LOGIN</Link></li>
<Route path="/login" element={<Login/>} /> */}
app.post('/newlogin', (req, res) => {
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
        req.session.username = req.body.username;
        res
          .status(201)
          .send("Account has been created, welcome aboard Helldiver")
          .cookie();
      } else {
        res
          .status(200)
          .send("Username is already in use, please try a different username");
      }
    });
});

app.patch('/updatepassword', (req, res) => {
  req.session.username = req.body.username;
  knex("help_desk_users")
    .where(`username = ${req.username}`)
    .update("password", req.password);
  res.status(201).send("Password updated").cookie();
});

app.listen(port, () => {
  console.log(`Server is listening to ${port}`);
});