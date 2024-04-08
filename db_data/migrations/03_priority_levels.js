exports.up = function(knex) {
  // Create the priority_levels table
  return knex.schema.createTable('priority_levels', table => {
    table.increments('priority_id').primary();
    table.string('severity');
    table.string('description');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('priority_levels');
};