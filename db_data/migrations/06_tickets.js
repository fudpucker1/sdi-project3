exports.up = function(knex) {
  // Create the tickets table
  return knex.schema.createTable('tickets', table => {
    table.increments('ticket_id').primary();
    table.integer('assigned_to').unsigned();
    table.foreign('assigned_to').references('help_desk_users.user_id');
    table.integer('equipment_id').unsigned();
    table.foreign('equipment_id').references('equipment.equipment_id');
    table.string('status');
    table.string('description');
    table.string('tasks');
    table.string('customer_name');
    table.string('customer_email');
    table.date('create_date');
    table.date('date_completed');
    table.integer('priority_level_id').unsigned();
    table.foreign('priority_level_id').references('priority_levels.priority_id');
    table.integer('ticket_type_id').unsigned();
    table.foreign('ticket_type_id').references('ticket_type.ticket_type_id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tickets');
};