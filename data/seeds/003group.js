exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("groups")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("groups").insert([
        { creatorId: 1, name: "Asgard castle rooms" },
        { creatorId: 1, name: "Asgard gardens" },
        { creatorId: 2, name: "Stark Equipment Maintenance" },
        { creatorId: 3, name: "PR with Americans" }
      ]);
    });
};
