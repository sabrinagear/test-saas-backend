
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        { text: 'a comment here', memberId: 1, taskId: 6},
        { text: 'a comment here', memberId: 2, taskId: 7},
        { text: 'a comment here', memberId: 3, taskId: 8},
        { text: 'a comment here', memberId: 4, taskId: 9},
      ]);
    });
};
