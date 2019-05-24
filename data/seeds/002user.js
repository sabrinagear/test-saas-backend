exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { uid: "uidstring0", email: "thor@avengers.com", name: "Thor" },
        { uid: "uidstring1", email: "ironman@avengers.com", name: "Iron Man" },
        {
          uid: "uidstring2",
          email: "captainamerica@avengers.com",
          name: "Captain America"
        },
        { uid: "uidstring3", email: "antman@avengers.com", name: "Ant-man" }
      ]);
    });
};
