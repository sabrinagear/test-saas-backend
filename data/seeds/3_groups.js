exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("groups")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("groups").insert([{ id: 1, creatorId: 2, name: "group" }]);
    });
};
