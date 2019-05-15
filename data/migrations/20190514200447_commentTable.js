exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", tbl => {
    tbl.increments("id");
    tbl.string("text", 255).notNullable();
    tbl
      .integer("memberId")
      .notNullable()
      .references("id")
      .inTable("groupMembers")
      .onDelete("CASCADE");
    tbl
      .integer("taskId")
      .notNullable()
      .references("id")
      .inTable("tasks")
      .onDelete("CASCADE");
    tbl.timestamp("createdAt").defaultTo(knex.fn.now());
    tbl.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("comments");
};
