/*
 * Create the 'groupMembers' table and initilize each column
 * This will handle defining each group created.
 */
exports.up = function(knex, Promise) {
  return knex.schema.createTable("groupMembers", function(tbl) {
    tbl.increments("id");
    tbl
      .string("userId")
      .references("uid")
      .inTable("users")
      .onDelete("CASCADE")
      .notNullable();
    tbl
      .integer("groupId")
      .references("id")
      .inTable("groups")
      .onDelete("CASCADE")
      .notNullable();
    tbl.boolean("isAdmin").defaultTo(false);
    tbl.boolean("weeklyNotification").defaultTo(true);
    tbl.boolean("monthlyNotification").defaultTo(true);
    tbl.timestamp("createdAt").defaultTo(knex.fn.now());
    tbl.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("groupMembers");
};
