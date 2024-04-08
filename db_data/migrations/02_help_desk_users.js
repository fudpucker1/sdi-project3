exports.up = function(knex) {
  // Create the help_desk_users table
  return knex.schema.createTable('help_desk_users', table => {
    table.increments('user_id').primary();
    table.string('username');
    table.string('password');
    table.integer('user_type_id').unsigned();
    table.foreign('user_type_id').references('user_type.user_type_id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('help_desk_users');
};