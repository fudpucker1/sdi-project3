exports.up = function(knex) {
  // Create the ticket_type table
  return knex.schema.createTable('ticket_type', table => {
    table.increments('ticket_type_id').primary();
    table.string('request_type');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('ticket_type');
};