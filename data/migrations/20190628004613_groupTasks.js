exports.up = function(knex, Promise) {
  return knex.schema.createTable("groupTasks", function(tbl) {
    tbl.increments();
    tbl
      .integer("taskId")
      .references("id")
      .inTable("tasks")
      .onDelete("CASCADE")
      .notnullable();
    tbl
      .integer("groupId")
      .references("id")
      .inTable("groups")
      .onDelete("CASCADE")
      .notnullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("groupTasks");
};
