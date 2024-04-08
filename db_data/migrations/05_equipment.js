exports.up = function(knex) {
  // Create the equipment table
  return knex.schema.createTable('equipment', table => {
    table.increments('equipment_id').primary();
    table.date('purchase_date');
    table.string('serial_number');
    table.string('model');
    table.string('type');
    table.date('end_of_life_date');
    table.string('notes');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('equipment');
};