require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = 8080;
const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(
  cookieSession({
    username: "user_session",
    // secure: true,
    httpOnly: true,
    // sameSite: "strict",
    secret: process.env.secret,
    maxAge: 24 * 60 * 60 * 1000,
    path: "/login",
  })
);

app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.post("/login", (req, res) => {
  knex("help_desk_users")
    .select("*")
    .where({
      username: `${req.body.username}`,
    })
    .then((user_info) => {
      console.log(req.body.username);
      if (user_info.length === 0) {
        res.status(404).send("User/Password not found");
      } else if (user_info[0].password !== req.body.password) {
        console.log(user_info);
        res.status(404).send("User/Password not found");
      } else {
        req.session.username = req.body.username;
        res.status(200).json(user_info);
      }
    });
});

// app.post("/newlogin", (req, res) => {
//   knex("help_desk_users")
//     .select("*")
//     .where("username", "=", req.body.username)
//     .then((user) => {
//       if (user === null) {
//         knex("help_desk_users").insert({
//           id: knex("help_desk_users").length + 1,
//           username: req.body.username,
//           password: req.body.password,
//         });
//         req.session.username = req.body.username;
//         res
//           .status(201)
//           .send("Account has been created, welcome aboard Helldiver");
//       } else {
//         res
//           .status(200)
//           .send("Username is already in use, please try a different username");
//       }
//     });
// });

// API END POINT TO CREATE USER TICKET
app.post("/createticket", (req, res) => {
  const {
    ticket_type_id,
    priority_level_id,
    equipment_id,
    description,
    customer_name,
    customer_email,
  } = req.body;

  const ticketData = {
    ticket_type_id,
    priority_level_id,
    description,
    customer_name,
    customer_email,
  };

  if (equipment_id !== "false") {
    ticketData.equipment_id = equipment_id;
  }

  knex("tickets")
    .insert(ticketData)
    .then(() => {
      return knex("tickets")
        .where("customer_email", customer_email)
        .orderBy("create_date", "desc")
        .first("ticket_id");
    })
    .then(({ ticket_id }) => {
      if (ticket_id) {
        res.status(201).json({
          ticket_id,
          message: `Your ticket has been created with a reference number of: ${ticket_id}`,
        });
      } else {
        res.status(404).send("Failed to retrieve ticket ID");
      }
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .send("We failed to create your ticket. Please contact the help desk.");
    });
});

// API END POINT TO LOOKUP EQUIPMENT ID BASED ON SERIAL NUMBER
app.get("/serialnumber/:serial_number", (req, res) => {
  const { serial_number } = req.params;
  knex("equipment")
    .select("equipment_id")
    .where("serial_number", serial_number)
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res
          .status(404)
          .json({ message: `Serial number '${serial_number}' not found` });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.patch("/updatepassword", (req, res) => {
  req.session.username = req.body.username;
  knex("help_desk_users")
    .where(`username = ${req.body.username}`)
    .update("password", req.body.password);
  res.status(201).send("Password updated").cookie();
});

app.get("/", (req, res) => {
  res.send("Express is up and running");
});

// Route to fetch tickets
app.get("/tickets", (req, res) => {
  knex("tickets")
    .select("*")
    .then((tickets) => {
      res.status(200).json(tickets);
    })
    .catch((error) => {
      console.error("Error fetching tickets:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.get("/tickets/:id", (req, res) => {
  const { id } = req.params;
  knex("tickets")
    .select("*")
    .where("ticket_id", id)
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: `Ticket number '${id}' not found` });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

// app.get("/tickets/:id", (req, res) => {
//   const { id } = req.params;

//   knex("tickets")
//     .select("*")
//     .where('ticket_id', id)
//     .then((ticket) => {
//       if (ticket.length === 0) {
//         // If no ticket found with the provided ID
//         res.status(404).json({ error: "Ticket not found" });
//       } else {
//         // If ticket found, return it
//         res.status(200).json(ticket[0]);
//       }
//     })
//     .catch((error) => {
//       console.error("Error fetching ticket:", error);
//       res.status(500).json({ error: "Internal server error" });
//     });
// });

// PATCH one ticket
app.patch("/tickets/:id", (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  knex("tickets")
    .select("*")
    .where({ ticket_id: parseInt(id) })
    .update(updateFields)
    .then((updatedRows) => {
      if (updatedRows === 0) {
        res.status(404).json({ error: "Ticket not found" });
      } else {
        res.status(200).json({ message: "Ticket updated successfully" });
      }
    })
    .catch((error) => {
      console.error("Error updating ticket:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// PUT an entirely new ticket
app.put("/tickets/:id", (req, res) => {
  const { id } = req.params; // string
  const newTicket = req.body;

  // missing values for keys will be interpreted as undefined in javascript
  // then knex interprets undefined as NULL in the sql database

  // make sure the endpoint id is consistent with the request body id
  // if (parseInt(id) == parseInt(newTicket.ticket_id)) {
  const fullTicket = {
    ticket_id: parseInt(newTicket.ticket_id),
    assigned_to: parseInt(newTicket.assigned_to ?? ""),
    equipment_id: parseInt(newTicket.equipment_id ?? ""),
    status: newTicket.status ?? "",
    description: newTicket.description ?? "",
    customer_name: newTicket.customer_name ?? "",
    customer_email: newTicket.customer_email ?? "",
    create_date: newTicket.create_date ?? "",
    date_completed: newTicket.date_completed ?? "",
    priority_level_id: parseInt(newTicket.priority_level_id ?? ""),
    ticket_type_id: parseInt(newTicket.ticket_type_id ?? ""),
  };
  // };

  knex("tickets")
    .select("*")
    .where({ ticket_id: parseInt(id) })
    .update(fullTicket)
    .then((updatedRows) => {
      if (updatedRows === 0) {
        res.status(404).json({ error: "Ticket not found" });
      } else {
        res.status(200).json({ message: "Ticket replaced successfully" });
      }
    })
    .catch((error) => {
      console.error("Error replacing ticket:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// DELETE a ticket using the id
app.delete("/tickets/:id", (req, res) => {
  const { id } = req.params;

  knex
    .transaction((trx) => {
      return trx("ticket_updates")
        .where({ ticket_id: parseInt(id) })
        .del()
        .then(() => {
          return trx("tickets")
            .where({ ticket_id: parseInt(id) })
            .del();
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .then(() => {
      res.status(200).json({ message: `Ticket with id ${id} deleted.` });
    })
    .catch((error) => {
      res.status(500).json({ message: `Error deleting ticket: ${error}` });
    });
});

app.listen(port, () => {
  console.log(`Server is listening to ${port}`);
});

app.post("/account_request", async (req, res) => {
  knex("help_desk_users")
    .select("*")
    .where({ username: `${req.body.username}` })
    .then((username_list) => {
      if (username_list.length !== 0) {
        res.status(409).send();
      } else {
        knex("account_request").insert({
          name: req.body.name,
          email: req.body.email,
          accountType: req.body.accountType,
          userName: req.body.username,
          password: req.body.password,
        });
        res.status(202).send("Account Requested");
      }})
    });