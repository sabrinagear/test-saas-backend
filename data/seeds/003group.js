exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("groups")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("groups").insert([
        { creatorId: "uidstring0", name: "Asgard castle rooms" },
        { creatorId: "uidstring0", name: "Asgard gardens" },
        { creatorId: "uidstring1", name: "Stark Equipment Maintenance" },
        { creatorId: "uidstring2", name: "PR with Americans" }
      ]);
    });
};
