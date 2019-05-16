exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("lists")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("lists").insert([
        { id: 1, list: "chores" },
        { id: 2, list: "errands" }
      ]);
    });
};
