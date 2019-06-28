exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("groupTasks")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("groupTasks").insert([
        { taskId: 1, groupId: 1 },
        { taskId: 2, groupId: 2 },
        { taskId: 3, groupId: 2 },
        { taskId: 4, groupId: 2 },
        { taskId: 5, groupId: 2 },
        { taskId: 6, groupId: 3 },
        { taskId: 7, groupId: 3 },
        { taskId: 8, groupId: 4 },
        { taskId: 9, groupId: 4 },
        { taskId: 10, groupId: 4 }
      ]);
    });
};
