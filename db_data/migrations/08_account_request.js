exports.up = function(knex) {
  // Create the account request table
  return knex.schema.createTable('account_request', table => {
    table.increments().primary();
    table.string('name');
    table.string('email');
    table.string('accountType');
    table.string('userName');
    table.string('password');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('account_request');
};