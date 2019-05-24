exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("groups")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("groups").insert([
        { creatorId: 1, name: "Asgard castle rooms", token: null },
        { creatorId: 1, name: "Asgard gardens", token: null },
        { creatorId: 2, name: "Stark Equipment Maintenance", token: null },
        { creatorId: 3, name: "PR with Americans", token: null }
      ]);
    });
};
