const express = require('express');
const Knex = require('knex');

const app = express();
const port = 3000;

// Connect to PostgreSQL
const knex = Knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'docker',
    database: 'helpdesk_tracker',
    port: 5432,
  },
});

app.get('/api', async (req, res) => {
  try {
    const result = await knex.raw('SELECT NOW()');
    res.send(`Current time: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error executing query');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
