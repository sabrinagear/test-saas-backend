exports.up = function(knex, Promise) {
  return knex.schema.createTable("friendTable", function(tbl) {
    tbl.increments("id");
    tbl
      .string("userId")
      .references("uid")
      .inTable("users")
      .onDelete("CASCADE")
      .notNullable();
    tbl
      .string("friendId")
      .references("uid")
      .inTable("users")
      .onDelete("CASCADE")
      .notNullable();

    tbl.timestamp("createdAt").defaultTo(knex.fn.now());
    tbl.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("friendTable");
};
