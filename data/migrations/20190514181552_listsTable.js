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
