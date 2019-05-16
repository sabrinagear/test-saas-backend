exports.up = function(knex, Promise) {
<<<<<<< HEAD
  return knex.schema.createTable("subscriptions", table => {
    table.increments("id");
    table.string("name").notNullable();
    table.integer("price").notNullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
=======
  return knex.schema
    .dropTableIfExists("subscriptions")
    .createTable("subscriptions", table => {
      table.increments("id");
      table.string("name").notNullable();
      table.integer("price").notNullable();
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now());
    });
>>>>>>> cfeb8baac6ae25d33764a7194fd13ca2faea698d
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("subscriptions");
};
