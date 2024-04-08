exports.up = function(knex) {
  // Create the ticket_updates table
  return knex.schema.createTable('ticket_updates', table => {
    table.increments('update_id').primary();
    table.string('body');
    table.date('date_created');
    table.time('time_created');
    table.integer('help_desk_users_id').unsigned();
    table.foreign('help_desk_users_id').references('help_desk_users.user_id');
    table.integer('ticket_id').unsigned();
    table.foreign('ticket_id').references('tickets.ticket_id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('ticket_updates');
};