exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("tasks")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("tasks").insert([
        { id: 1, title: "Mow the lawn", assignedTo: 1, groupId: 1, listId: 1 },
        {
          id: 2,
          title: "Sweep and Mop the kitchen",
          assignedTo: 1,
          groupId: 1,
          listId: 1
        },
        {
          id: 3,
          title: "Clean the bathroom",
          assignedTo: 1,
          groupId: 1,
          listId: 1
        }
      ]);
    });
};
