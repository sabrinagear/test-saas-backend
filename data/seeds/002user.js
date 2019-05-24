exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { email: "thor@avengers.com", name: "Thor" },
        { email: "ironman@avengers.com", name: "Iron Man" },
        { email: "captainamerica@avengers.com", name: "Captain America" },
        { email: "antman@avengers.com", name: "Ant-man" }
      ]);
    });
};
