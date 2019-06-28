exports.up = function(knex, Promise) {
  return knex.schema.createTable("groupTasks", function(tbl) {
    tbl.increments();
    tbl
      .string("taskId")
      .references("id")
      .inTable("tasks")
      .onDelete("CASCADE")
      .notNullable();
    tbl
      .integer("groupId")
      .references("id")
      .inTable("groups")
      .onDelete("CASCADE")
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("groupTasks");
};
