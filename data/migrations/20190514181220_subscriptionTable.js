exports.up = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("subscriptions")
    .createTable("subscriptions", table => {
      table.increments("id");
      table.string("name").notNullable();
      table.integer("price").notNullable();
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("subscriptions");
};
