// const faker = require("faker");

// const createFakeUser = () => ({
//   name: faker.name.findName(),
//   email: faker.internet.email()
// });

// exports.seed = function(knex, promise) {
//   let fakeUsers = [];
//   const desiredFakeUsers = 5;
//   for (let i = 0; i < desiredFakeUsers; i++) {
//     fakeUsers.push(createFakeUser());
//   }
const fakeUsers = [
  {
    id: 1,
    email: "Dolores61@hotmail.com",
    name: "Alison Jast",
    profilePicture: "https://i.imgur.com/M8kRKQC.png",
    subscriptionType: null,
    createdAt: "2019-05-16T00:26:14.734Z",
    updatedAt: "2019-05-16T00:26:14.734Z"
  },
  {
    id: 2,
    email: "Mauricio_Runte74@gmail.com",
    name: "Bo MacGyver",
    profilePicture: "https://i.imgur.com/M8kRKQC.png",
    subscriptionType: null,
    createdAt: "2019-05-16T00:26:14.734Z",
    updatedAt: "2019-05-16T00:26:14.734Z"
  },
  {
    id: 3,
    email: "Larue.Boehm@hotmail.com",
    name: "Arnold Pollich DDS",
    profilePicture: "https://i.imgur.com/M8kRKQC.png",
    subscriptionType: null,
    createdAt: "2019-05-16T00:26:14.734Z",
    updatedAt: "2019-05-16T00:26:14.734Z"
  },
  {
    id: 4,
    email: "Charlene.Armstrong@yahoo.com",
    name: "Jaeden Rutherford",
    profilePicture: "https://i.imgur.com/M8kRKQC.png",
    subscriptionType: null,
    createdAt: "2019-05-16T00:26:14.734Z",
    updatedAt: "2019-05-16T00:26:14.734Z"
  }
];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries

      return knex(`users`).insert(fakeUsers);
    });
};
