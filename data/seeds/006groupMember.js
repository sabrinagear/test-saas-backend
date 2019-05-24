exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("groupMembers")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("groupMembers").insert([
        { userId: 4, groupId: 1, isAdmin: true },
        { userId: 4, groupId: 3 },
        { userId: 4, groupId: 4 },
        { userId: 3, groupId: 2 },
        { userId: 3, groupId: 4 },
        { userId: 2, groupId: 2 },
        { userId: 2, groupId: 3 },
        { userId: 1, groupId: 1 },
        { userId: 1, groupId: 2 },
        { userId: 1, groupId: 4 }
      ]);
    });
};
