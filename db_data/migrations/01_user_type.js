exports.up = function(knex) {
  // Create the user_type table
  return knex.schema.createTable('user_type', table => {
    table.increments('user_type_id').primary();
    table.string('name');
    table.string('description');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_type');
};