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
    .where(`username = ${req.body.username}`)
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

// API END POINT TO CREATE USER TICKET
app.post('/createticket', (req, res) => {
  const { ticket_type_id, priority_level_id, equipment_id, description, customer_name, customer_email } = req.body;

  knex('tickets').insert({
    ticket_type_id,
    priority_level_id,
    equipment_id,
    description,
    customer_name,
    customer_email
  })
  .then(() => {
    return knex('tickets')
      .where('customer_email', customer_email)
      .orderBy('create_date', 'desc')
      .first('ticket_id')
    })
  .then(({ ticket_id }) => {
    if (ticket_id) {
      res.status(201).json({ ticket_id, message: `Your ticket has been created with a reference number of: ${ticket_id}` });
    } else {
      res.status(404).send('Failed to retrieve ticket ID');
    }
  })
  .catch(error => {
    console.error(error);
    res.status(500).send('We failed to create your ticket. Please contact the help desk.');
  });
});

// API END POINT TO LOOKUP EQUIPMENT ID BASED ON SERIAL NUMBER
app.get('/serialnumber/:serial_number', (req, res) => {
  const { serial_number } = req.params;
  knex('equipment')
    .select('equipment_id')
    .where('serial_number', serial_number)
    .then(data => {
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: `Serial number '${serial_number}' not found` });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
})

app.patch('/updatepassword', (req, res) => {
  req.session.username = req.body.username;
  knex("help_desk_users")
    .where(`username = ${req.username}`)
    .update("password", req.password);
  res.status(201).send("Password updated").cookie();
});

app.get('/', (req, res) => {
  res.send("Express is up and running")
})

app.listen(port, () => {
  console.log(`Server is listening to ${port}`);
});