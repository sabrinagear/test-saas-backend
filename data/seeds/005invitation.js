exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("invitations")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("invitations").insert([
        {
          inviteCode: "1234567890",
          groupID: 1,

          expiration: "2100-01-30"
        },
        {
          inviteCode: "1234567891",
          groupID: 2,

          expiration: "2100-01-30"
        },
        {
          inviteCode: "1234567892",
          groupID: 3,

          expiration: "2100-01-30"
        },
        {
          inviteCode: "1234567893",
          groupID: 4,

          expiration: "2100-01-30"
        }
      ]);
    });
};
