exports.up = function(knex, Promise) {
  return knex.schema.createTable("tasks", table => {
    table.increments("id");
    table.string("title", 255).notNullable();
    table
      .integer("assignedTo")
      .references("id")
      .inTable("groupMembers");
    table
      .integer("groupId")
      .references("id")
      .inTable("groups")
      .onDelete("CASCADE")
      .notNullable();
    table.boolean("isComplete").defaultTo(false);
    table.string("description");
    table.date("dueDate");

    table
      .biginteger("listId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("lists")
      .onDelete("CASCADE")
      .index();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("items");
};
