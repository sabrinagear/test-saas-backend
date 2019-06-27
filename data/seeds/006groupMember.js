exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("groupMembers")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("groupMembers").insert([
        { userId: "uidstring0", groupId: 1, isAdmin: true },
        { userId: "uidstring1", groupId: 1 },
        { userId: "uidstring2", groupId: 1 },
        { userId: "uidstring3", groupId: 1 },
        { userId: "uidstring0", groupId: 2, isAdmin: true },
        { userId: "uidstring1", groupId: 2 },
        { userId: "uidstring2", groupId: 2 },
        { userId: "uidstring3", groupId: 2 }
      ]);
    });
};
