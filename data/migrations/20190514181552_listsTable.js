exports.up = function(knex, Promise) {
  return knex.schema.createTable("lists", table => {
    table.increments("id");
    table
      .string("list", 255)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("lists");
};
