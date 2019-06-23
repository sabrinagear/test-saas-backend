exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          uid: "uidstring0",
          email: "thor@avengers.com",
          name: "Thor",
          location: "Boise, Idaho"
        },
        {
          uid: "uidstring1",
          email: "ironman@avengers.com",
          name: "Iron Man",
          location: "Denver, Colorado"
        },
        {
          uid: "uidstring2",
          email: "captainamerica@avengers.com",
          name: "Captain America",
          location: "Seattle, Washington"
        },
        {
          uid: "uidstring3",
          email: "antman@avengers.com",
          name: "Ant-man",
          location: "Nashville, TN"
        }
      ]);
    });
};
