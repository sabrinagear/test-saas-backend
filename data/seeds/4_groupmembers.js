exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("groupMembers")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("groupMembers").insert([
        { id: 1, userId: 1, groupId: 1, isAdmin: true },
        { id: 2, userId: 2, groupId: 1, isAdmin: true }
      ]);
    });
};
