<<<<<<< HEAD
exports.up = function(knex, Promise) {
<<<<<<< HEAD
  return knex.schema.createTable("lists", table => {
=======
  return knex.schema.dropTableIfExists("lists").createTable("lists", table => {
>>>>>>> cfeb8baac6ae25d33764a7194fd13ca2faea698d
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
=======
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
>>>>>>> 0a1b9e5ee2020e4ad65b0dc4254cc2ee7d1d13a3
