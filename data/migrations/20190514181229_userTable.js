exports.up = function(knex, Promise) {
<<<<<<< HEAD
  return knex.schema.createTable("users", table => {
=======
  return knex.schema.dropTableIfExists("users").createTable("users", table => {
>>>>>>> cfeb8baac6ae25d33764a7194fd13ca2faea698d
    table.increments("id");
    table
      .string("email", 255)
      .notNullable()
      .unique();
    table.string("name", 255).notNullable();
    table
      .string("profilePicture", 255)
      .defaultTo("https://i.imgur.com/M8kRKQC.png");
    table
      .integer("subscriptionType")
      .references("id")
<<<<<<< HEAD
<<<<<<< HEAD
      .inTable("subscriptions")
      .defaultTo(1);
=======
      .inTable("subscriptions");
=======
      .inTable("subscriptions")
      .onDelete("CASCADE");
>>>>>>> 9b39c5865229407dc39ae368382b3ff8b5ae0ee5
    // .defaultTo(1);
>>>>>>> cfeb8baac6ae25d33764a7194fd13ca2faea698d
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
